# Quick Local Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Environment File

Create `.env.local` in the root directory:

```env
NODE_ENV=development
VITE_API_URL=http://localhost:5173/api
VITE_WHATSAPP_NUMBER=919876543210
```

## 3. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:5173

## 4. Deploy to Vercel

### Option A: Vercel Dashboard
1. Go to vercel.com
2. Connect your GitHub repository
3. Deploy automatically

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## Important Files for Deployment

- `vercel.json` - Vercel configuration
- `.env.example` - Environment variables template
- `package.json` - Dependencies and scripts

## Environment Variables for Production

Set these in Vercel dashboard:

```
NODE_ENV=production
VITE_WHATSAPP_NUMBER=your_actual_number
CONTACT_NOTIFICATION_EMAIL=your-email@example.com
```

That's it! Your Kerala food products website will be live! 🎉
