import { Hono } from "hono";
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { ContactFormSchema } from '../shared/types';
import { getCookie, setCookie } from "hono/cookie";
import bcrypt from 'bcryptjs';
import { z } from 'zod';

interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const app = new Hono<{ 
  Bindings: Env;
  Variables: {
    admin: AdminUser;
  };
}>();

// Enable CORS for all routes
app.use('*', cors());

// Admin login schema
const AdminLoginSchema = z.object({
  username: z.string(),
  password: z.string()
});

// Admin session middleware
const adminAuthMiddleware = async (c: any, next: any) => {
  const adminToken = getCookie(c, 'admin_session');
  
  if (!adminToken) {
    return c.json({ success: false, message: 'Admin authentication required' }, 401);
  }

  try {
    // Verify admin session
    const adminSession = await c.env.DB.prepare(`
      SELECT * FROM admin_sessions WHERE token = ? AND expires_at > datetime('now')
    `).bind(adminToken).first();

    if (!adminSession) {
      return c.json({ success: false, message: 'Invalid or expired admin session' }, 401);
    }

    // Get admin user
    const adminUser = await c.env.DB.prepare(`
      SELECT * FROM admin_users WHERE id = ? AND is_active = 1
    `).bind(adminSession.admin_id).first() as AdminUser | null;

    if (!adminUser) {
      return c.json({ success: false, message: 'Admin user not found' }, 401);
    }

    c.set('admin', adminUser);
    return next();
  } catch (error) {
    return c.json({ success: false, message: 'Authentication error' }, 401);
  }
};

// Contact form submission endpoint
app.post('/api/contact', zValidator('json', ContactFormSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    // Insert into database
    const result = await c.env.DB.prepare(`
      INSERT INTO contact_submissions (first_name, last_name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(
      data.firstName,
      data.lastName,
      data.email,
      data.phone || null,
      data.subject,
      data.message
    ).run();

    if (!result.success) {
      throw new Error('Failed to save contact submission');
    }

    return c.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: { id: result.meta.last_row_id }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return c.json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }, 500);
  }
});

// Get all contact submissions (admin endpoint)
app.get('/api/contact', async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC
    `).all();

    return c.json({
      success: true,
      message: 'Contact submissions retrieved successfully',
      data: result.results
    });

  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return c.json({
      success: false,
      message: 'Error fetching contact submissions'
    }, 500);
  }
});

// Admin authentication endpoints
app.post('/api/admin/login', zValidator('json', AdminLoginSchema), async (c) => {
  try {
    const { username, password } = c.req.valid('json');

    // Find admin user
    const admin = await c.env.DB.prepare(`
      SELECT * FROM admin_users WHERE username = ? AND is_active = 1
    `).bind(username).first() as AdminUser | null;

    if (!admin) {
      return c.json({
        success: false,
        message: 'Invalid credentials'
      }, 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password_hash as string);

    if (!isValidPassword) {
      return c.json({
        success: false,
        message: 'Invalid credentials'
      }, 401);
    }

    // Generate session token
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Store session
    await c.env.DB.prepare(`
      INSERT INTO admin_sessions (admin_id, token, expires_at)
      VALUES (?, ?, ?)
    `).bind(admin.id, sessionToken, expiresAt.toISOString()).run();

    // Set cookie
    setCookie(c, 'admin_session', sessionToken, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: true,
      maxAge: 24 * 60 * 60 // 24 hours
    });

    return c.json({
      success: true,
      message: 'Admin login successful',
      data: {
        id: admin.id,
        username: admin.username
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return c.json({
      success: false,
      message: 'Login failed'
    }, 500);
  }
});

app.post('/api/admin/logout', async (c) => {
  const adminToken = getCookie(c, 'admin_session');

  if (adminToken) {
    // Delete session from database
    await c.env.DB.prepare(`
      DELETE FROM admin_sessions WHERE token = ?
    `).bind(adminToken).run();
  }

  // Clear cookie
  setCookie(c, 'admin_session', '', {
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
    maxAge: 0
  });

  return c.json({ success: true, message: 'Admin logout successful' });
});

app.get('/api/admin/me', adminAuthMiddleware, async (c) => {
  const admin = c.get('admin');
  return c.json({
    success: true,
    data: {
      id: admin.id,
      username: admin.username,
      type: 'admin'
    }
  });
});

// Admin endpoints
app.get('/api/admin/products', adminAuthMiddleware, async (c) => {
  try {
    const user = c.get('user');
    if (!user) {
      return c.json({ success: false, message: 'User not found' }, 401);
    }
    
    // Admin is already authenticated via adminAuthMiddleware

    const result = await c.env.DB.prepare(`
      SELECT * FROM products ORDER BY created_at DESC
    `).all();

    return c.json({
      success: true,
      message: 'Products retrieved successfully',
      data: result.results
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return c.json({
      success: false,
      message: 'Error fetching products'
    }, 500);
  }
});

// Initialize products data (run once)
app.post('/api/admin/init-products', adminAuthMiddleware, async (c) => {
  try {
    const user = c.get('user');
    if (!user) {
      return c.json({ success: false, message: 'User not found' }, 401);
    }
    
    // Admin is already authenticated via adminAuthMiddleware

    // Sample product data
    const products = [
      {
        name: "Steamed Puttupodi",
        category: "Puttupodi",
        price: 85,
        description: "Traditional Kerala steamed puttu powder made from finest rice.",
        image_url: "https://mocha-cdn.com/01983759-1b58-7c5b-9a8c-2d9e4b0033b6/STEAMED-PUTTU-POWDER.jpg",
        stock_quantity: 50,
        rating: 4.8
      },
      {
        name: "Ragi Puttupodi",
        category: "Puttupodi",
        price: 95,
        description: "Nutritious finger millet puttu powder, rich in calcium and iron.",
        image_url: "https://mocha-cdn.com/01983759-1b58-7c5b-9a8c-2d9e4b0033b6/RAGI-PUTTU-POWDER.jpg",
        stock_quantity: 45,
        rating: 4.9
      },
      {
        name: "Muringa Leaves Powder",
        category: "Powders",
        price: 180,
        description: "Pure moringa leaves powder, nature's multivitamin.",
        image_url: "https://mocha-cdn.com/01983759-1b58-7c5b-9a8c-2d9e4b0033b6/muringa-leaves-powder.jpg",
        stock_quantity: 30,
        rating: 4.9
      }
    ];

    for (const product of products) {
      await c.env.DB.prepare(`
        INSERT OR IGNORE INTO products (name, category, price, description, image_url, stock_quantity, rating)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `).bind(
        product.name,
        product.category,
        product.price,
        product.description,
        product.image_url,
        product.stock_quantity,
        product.rating
      ).run();
    }

    return c.json({
      success: true,
      message: 'Products initialized successfully'
    });
  } catch (error) {
    console.error('Error initializing products:', error);
    return c.json({
      success: false,
      message: 'Error initializing products'
    }, 500);
  }
});

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({
    success: true,
    message: 'Royal Taste API is running',
    timestamp: new Date().toISOString()
  });
});

export default app;
