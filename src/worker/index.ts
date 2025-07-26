import { Hono } from "hono";
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import { ContactFormSchema } from '../shared/types';

interface Env {
  DB: any;
}

// Simple logging function for production
const logError = (_message: string, _error?: any) => {
  // In production, this could send to external logging service
  // For now, we'll just silently handle errors
  // You can implement proper logging service integration here
};

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting middleware
const rateLimit = (maxRequests: number, windowMs: number) => {
  return async (c: any, next: any) => {
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
const securityHeaders = async (c: any, next: any) => {
  // Add security headers
  c.header('X-Content-Type-Options', 'nosniff');
  c.header('X-Frame-Options', 'DENY');
  c.header('X-XSS-Protection', '1; mode=block');
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return next();
};

const app = new Hono<{ 
  Bindings: Env;
}>();

// Enable CORS for all routes
app.use('*', cors());

// Add security headers to all routes
app.use('*', securityHeaders);

// Global error handler
app.onError((err, c) => {
  logError('Unhandled error:', err);
  
  // Don't expose internal errors in production
  // In Cloudflare Workers, we'll use a simple approach
  const isProduction = !c.req.header('user-agent')?.includes('development');
  
  return c.json({
    success: false,
    message: isProduction 
      ? 'An unexpected error occurred. Please try again later.'
      : err.message,
    ...(isProduction ? {} : { stack: err.stack })
  }, 500);
});

// Contact form submission endpoint
app.post('/api/contact', rateLimit(5, 60000), zValidator('json', ContactFormSchema), async (c) => {
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

export default app;
