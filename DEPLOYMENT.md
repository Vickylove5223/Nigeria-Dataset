# Deployment Guide

This guide shows you how to deploy your Nigeria Data API for free so anyone can access it.

## Option 1: Render (Recommended - Easiest)

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit: Nigeria Data API"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. Go to [render.com](https://render.com) and sign up

3. Click "New +" → "Web Service"

4. Connect your GitHub repository

5. Configure:
   - Name: `nigeria-data-api` (or your choice)
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

6. Click "Create Web Service"

7. Your API will be live at: `https://nigeria-data-api.onrender.com`

**Note:** Free tier sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds.

## Option 2: Railway

1. Push to GitHub (same as above)

2. Go to [railway.app](https://railway.app)

3. Click "New Project" → "Deploy from GitHub repo"

4. Select your repository

5. Railway auto-detects Node.js and deploys automatically

6. Your API will be live at the provided URL

## Option 3: Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts

4. Your API will be live at the provided URL

**Note:** The `vercel.json` file is already configured for you.

## Option 4: Heroku

1. Install Heroku CLI

2. Login:
```bash
heroku login
```

3. Create app:
```bash
heroku create nigeria-data-api
```

4. Deploy:
```bash
git push heroku main
```

5. Your API will be live at: `https://nigeria-data-api.herokuapp.com`

## After Deployment

1. Test your API:
```bash
curl https://your-api-url.com/api/states
```

2. Update your README with the live URL

3. Share with others!

## Custom Domain (Optional)

Most platforms allow you to add a custom domain:
- Render: Settings → Custom Domain
- Railway: Settings → Domains
- Vercel: Settings → Domains

## Environment Variables

If you need to add environment variables:
- Create a `.env` file locally (already in `.gitignore`)
- Add variables in your hosting platform's dashboard

## Monitoring

Free monitoring options:
- UptimeRobot: Monitor uptime
- Better Uptime: Free monitoring
- Render/Railway built-in logs

## Rate Limiting (Optional)

To add rate limiting, install:
```bash
npm install express-rate-limit
```

Then add to `server.js`:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
```

## Troubleshooting

### API not responding
- Check logs in your hosting dashboard
- Verify `PORT` environment variable is set correctly
- Ensure `package.json` has correct start script

### Data not loading
- Verify `data/nigeria-data.json` is committed to git
- Check file paths are correct
- Review server logs for errors

### Slow first request
- This is normal for free tiers (cold starts)
- Consider upgrading to paid tier for always-on service
- Or use a service like UptimeRobot to ping every 5 minutes
