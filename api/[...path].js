import app from '../src/worker/index.js';

// Export as Vercel serverless function
export default async function handler(req, res) {
  return app.fetch(req, res);
} 