# Git Setup and Deployment Commands

Follow these steps to push your API to GitHub and deploy it.

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it: `nigeria-data-api` (or your choice)
4. Description: "Free API for Nigerian states, LGAs, tribes, and demographic data"
5. Keep it **Public** (so others can use it)
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Initialize Git Locally

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete Nigeria Data API with 37 states and 774 LGAs"
```

## Step 3: Connect to GitHub

Replace `YOUR_USERNAME` with your GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/nigeria-data-api.git

# Verify remote was added
git remote -v
```

## Step 4: Push to GitHub

```bash
# Push to GitHub
git branch -M main
git push -u origin main
```

Your code is now on GitHub! 🎉

## Step 5: Deploy to Render (Free)

### Option A: Using Render Dashboard

1. Go to [render.com](https://render.com)
2. Sign up or log in
3. Click "New +" → "Web Service"
4. Click "Connect GitHub" and authorize Render
5. Select your `nigeria-data-api` repository
6. Configure:
   - **Name:** `nigeria-data-api`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
7. Click "Create Web Service"
8. Wait 2-3 minutes for deployment
9. Your API is live! 🚀

### Option B: Using Render Blueprint (Faster)

1. Add `render.yaml` to your project:

```yaml
services:
  - type: web
    name: nigeria-data-api
    env: node
    buildCommand: npm install
    startCommand: npm start
    plan: free
```

2. Commit and push:
```bash
git add render.yaml
git commit -m "Add Render deployment config"
git push
```

3. Go to Render dashboard → "New +" → "Blueprint"
4. Select your repository
5. Click "Apply"

## Step 6: Update README with Live URL

After deployment, update your README.md:

```bash
# Edit README.md and replace localhost URLs with your live URL
# Example: https://nigeria-data-api.onrender.com

git add README.md
git commit -m "Update README with live API URL"
git push
```

## Alternative Deployment Options

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts
```

## Useful Git Commands

### Making Changes

```bash
# Check status
git status

# Add specific file
git add filename.js

# Add all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Viewing History

```bash
# View commit history
git log

# View recent commits (short)
git log --oneline

# View changes
git diff
```

### Branching (for features)

```bash
# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name

# Delete branch
git branch -d feature-name
```

## After Deployment

### Test Your Live API

```bash
# Replace with your actual URL
curl https://nigeria-data-api.onrender.com/api/states

# Or open in browser
https://nigeria-data-api.onrender.com
```

### Share Your API

Add this to your GitHub README:

```markdown
## Live API

🌐 **Base URL:** `https://nigeria-data-api.onrender.com`

### Example Requests

- Get all states: `https://nigeria-data-api.onrender.com/api/states`
- Get Lagos state: `https://nigeria-data-api.onrender.com/api/states/Lagos`
- Get all LGAs: `https://nigeria-data-api.onrender.com/api/lgas`
```

## Updating Your API

When you make changes:

```bash
# Make your changes to files

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Add state logos" # or whatever you changed

# Push to GitHub
git push

# Render/Railway/Vercel will auto-deploy!
```

## Troubleshooting

### "Permission denied" error
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR_USERNAME/nigeria-data-api.git
```

### "Repository not found"
```bash
# Check remote URL
git remote -v

# Update if wrong
git remote set-url origin https://github.com/YOUR_USERNAME/nigeria-data-api.git
```

### Deployment fails
1. Check logs in Render/Railway/Vercel dashboard
2. Verify `package.json` has correct start script
3. Ensure all files are committed
4. Check Node.js version compatibility

## Environment Variables (if needed)

If you add environment variables later:

### Render
1. Go to your service dashboard
2. Click "Environment"
3. Add variables
4. Click "Save Changes"

### Railway
1. Go to your project
2. Click "Variables"
3. Add variables
4. Deploy

### Vercel
```bash
vercel env add VARIABLE_NAME
```

## Monitoring Your API

### Free Monitoring Tools

1. **UptimeRobot** (uptimerobot.com)
   - Free monitoring
   - Email alerts
   - 5-minute checks

2. **Better Uptime** (betteruptime.com)
   - Free tier available
   - Status pages
   - Incident management

3. **Render Built-in**
   - View logs in dashboard
   - Monitor deployments
   - Check health

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Render/Railway/Vercel
3. ✅ Test live API
4. ✅ Update README with live URL
5. ✅ Share with community
6. ✅ Add to your portfolio
7. ✅ Tweet about it! 🐦

## Need Help?

- GitHub Issues: Open an issue in your repository
- Render Docs: [render.com/docs](https://render.com/docs)
- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)

---

**You're all set! Your Nigeria Data API is ready to serve the community! 🇳🇬🚀**
