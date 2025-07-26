import { Hono } from "hono";
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { sql } from '@vercel/postgres';

// Contact form validation schema
const ContactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^[\d\s\-\+\(\)]+$/.test(val), "Phone number can only contain digits, spaces, hyphens, and parentheses")
    .refine((val) => !val || val.length <= 20, "Phone number must be less than 20 characters"),
  subject: z.string()
    .min(1, "Please select a subject")
    .max(100, "Subject must be less than 100 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .regex(/^[a-zA-Z0-9\s\.,!?\-_@#$%&*()]+$/, "Message contains invalid characters")
});

// Simple logging function for production
const logError = (_message, _error) => {
  // In production, this could send to external logging service
  // For now, we'll just silently handle errors
};

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

// Rate limiting middleware
const rateLimit = (maxRequests, windowMs) => {
  return async (c, next) => {
    const ip = c.req.header('cf-connecting-ip') || c.req.header('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const key = `${ip}:${c.req.path}`;
    
    const record = rateLimitStore.get(key);
    
    if (!record || now > record.resetTime) {
      rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    } else if (record.count >= maxRequests) {
      return c.json({
        success: false,
        message: 'Too many requests. Please try again later.'
      }, 429);
    } else {
      record.count++;
    }
    
    return next();
  };
};

// Security headers middleware
const securityHeaders = async (c, next) => {
  // Add security headers
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return next();
};

const app = new Hono();

// Enable CORS for all routes
app.use('*', cors());

// Add security headers to all routes
app.use('*', securityHeaders);

// Global error handler
app.onError((err, c) => {
  logError('Unhandled error:', err);
  
  // Don't expose internal errors in production
  const isProduction = !c.req.header('user-agent')?.includes('development');
  
  return c.json({
    success: false,
    message: isProduction 
      ? 'An unexpected error occurred. Please try again later.'
      : err.message,
    ...(isProduction ? {} : { stack: err.stack })
  }, 500);
});

// Initialize database table
const initializeDatabase = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        subject VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (error) {
    logError('Database initialization error:', error);
  }
};

// Initialize database on startup
initializeDatabase();

// Contact form submission endpoint
app.post('/api/contact', rateLimit(5, 60000), zValidator('json', ContactFormSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    // Insert into database
    const result = await sql`
      INSERT INTO contact_submissions (name, email, phone, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.phone || null}, ${data.subject}, ${data.message})
      RETURNING id;
    `;

    return c.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      data: { id: result.rows[0].id }
    });

  } catch (error) {
    logError('Contact form error:', error);
    return c.json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again.'
    }, 500);
  }
});

// Get all contact submissions
app.get('/api/contact', async (c) => {
  try {
    const result = await sql`
      SELECT * FROM contact_submissions 
      ORDER BY created_at DESC;
    `;

    return c.json({
      success: true,
      message: 'Contact submissions retrieved successfully',
      data: result.rows
    });

  } catch (error) {
    logError('Error fetching contact submissions:', error);
    return c.json({
      success: false,
      message: 'Error fetching contact submissions'
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

// Export as Vercel serverless function
export default async function handler(req, res) {
  return app.fetch(req, res);
} 