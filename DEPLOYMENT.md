# Deployment Guide - Arshi GPS

## Production Deployment Checklist

### Pre-Deployment

- [ ] Update all `.env` files with production values
- [ ] Run security audit: `npm audit`
- [ ] Run tests: `npm test`
- [ ] Update VERSION in package.json
- [ ] Review all API endpoints for security
- [ ] Enable HTTPS/SSL certificates
- [ ] Setup monitoring and logging

## Backend Deployment

### Option 1: Render.com (Recommended)

1. **Create Render Account**
   - Sign up at render.com
   - Connect GitHub repository

2. **Configure Backend Service**
   - Create "New Web Service"
   - Select GitHub repository
   - Name: `arshi-gps-backend`
   - Build command: `npm install`
   - Start command: `npm start`
   - Region: Singapore/India
   - Plan: Standard ($7/month)

3. **Set Environment Variables**

   ```
   NODE_ENV=production
   MONGODB_URI=<Production MongoDB Atlas connection>
   JWT_SECRET=<Generate strong secret>
   JWT_EXPIRE=7d
   PORT=5000
   FRONTEND_URL=<Your Vercel frontend URL>
   EMAIL_USER=<Gmail address>
   EMAIL_PASSWORD=<Gmail app password>
   ADMIN_EMAIL=<Your admin email>
   ADMIN_PASSWORD=<Strong password>
   ```

4. **Deploy**
   - Push code to main branch
   - Render auto-deploys

### Option 2: Railway.app

1. Sign up at railway.app
2. Connect GitHub
3. Add environment variables
4. Deploy

### Option 3: VPS (DigitalOcean/Linode/AWS)

1. **SSH into server**

   ```bash
   ssh root@your_server_ip
   ```

2. **Install dependencies**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs npm
   ```

3. **Install MongoDB**

   ```bash
   sudo apt-get install -y mongodb
   ```

4. **Setup Node app with PM2**

   ```bash
   npm install -g pm2
   pm2 start src/server.js --name "arshi-gps"
   pm2 startup
   pm2 save
   ```

5. **Setup Nginx reverse proxy**

   ```nginx
   server {
     listen 80;
     server_name your_domain.com;

     location / {
       proxy_pass http://localhost:5000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

6. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your_domain.com
   ```

## Frontend Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub**
   - Go to vercel.com
   - Sign in with GitHub
   - Import repository

2. **Configure Settings**
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Set Environment Variables**

   ```
   VITE_API_URL=https://your-backend-url/api/v1
   ```

4. **Deploy**
   - Vercel auto-deploys on git push
   - Get your frontend URL

### Alternative: Netlify

1. Connect GitHub
2. Set build command: `npm run build`
3. Set publish directory: `frontend/dist`
4. Add environment variables
5. Deploy

## Database Setup (MongoDB Atlas)

1. **Create Cluster**
   - Go to mongodb.com/cloud
   - Create free tier cluster
   - Select region: Singapore/Mumbai

2. **Create Database User**
   - Go to Database Access
   - Add user with strong password
   - Note down username and password

3. **Setup Network Access**
   - Go to Network Access
   - Add IP: 0.0.0.0/0 (or specific IPs)

4. **Get Connection String**
   - Go to Clusters
   - Click Connect
   - Copy connection string
   - Replace username and password

5. **Format**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/arshi-gps?retryWrites=true&w=majority
   ```

## Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication
2. Generate App Password
3. Use app password in `EMAIL_PASSWORD`
4. Set `EMAIL_USER` to your Gmail address

## Domain Configuration

### DNS Setup

1. **For Vercel Frontend**
   - Point CNAME to `cname.vercel.com`

2. **For Render Backend**
   - Create subdomain: `api.yourdomain.com`
   - Point CNAME to Render URL

3. **Or use full domain**
   - Frontend: `yourdomain.com`
   - API: `api.yourdomain.com`

## SSL/HTTPS

- Vercel: Auto SSL included
- Render: Auto SSL included
- VPS: Use Let's Encrypt (free)

## Post-Deployment

1. **Verify Endpoints**

   ```bash
   curl https://your-api.com/health
   ```

2. **Test Signup/Login**
   - Create test account
   - Verify JWT token
   - Check admin login

3. **Monitor Logs**
   - Render: View logs in dashboard
   - Vercel: Check deployment logs
   - VPS: Use `pm2 logs`

4. **Setup Monitoring**
   - Uptime monitoring: UptimeRobot
   - Error tracking: Sentry
   - Analytics: Google Analytics

5. **Backup Database**
   - MongoDB Atlas: Enable auto-backup
   - VPS: Setup daily backups

## Scaling & Performance

### Optimize for Production

1. **Backend**
   - Enable gzip compression ✓
   - Use connection pooling
   - Implement caching
   - Scale horizontally with load balancer

2. **Frontend**
   - Optimize images
   - Enable CDN
   - Minimize bundle size
   - Use service workers

3. **Database**
   - Add indexes ✓
   - Archive old data
   - Monitor query performance
   - Scale replica sets

## Security Checklist

- [ ] All endpoints secured with JWT ✓
- [ ] Rate limiting enabled ✓
- [ ] Helmet headers configured ✓
- [ ] CORS properly configured ✓
- [ ] Environment variables secured ✓
- [ ] Passwords hashed with bcryptjs ✓
- [ ] HTTPS enabled everywhere ✓
- [ ] Database backup strategy in place
- [ ] Regular security audits
- [ ] Keep dependencies updated

## Monitoring & Maintenance

### Health Checks

```bash
# Backend health
curl https://api.yourdomain.com/health

# Frontend health
curl https://yourdomain.com
```

### Regular Tasks

- Daily: Check error logs
- Weekly: Monitor performance metrics
- Monthly: Update dependencies
- Quarterly: Security audit
- Quarterly: Database optimization

## Troubleshooting

### 502 Bad Gateway

- Check if backend is running
- Verify environment variables
- Check database connection

### Connection Timeout

- Verify MongoDB Atlas IP whitelist
- Check network connectivity
- Review API response times

### High Latency

- Enable caching
- Optimize database queries
- Use CDN for static assets
- Consider upgrading plan

## Support & Documentation

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com/api

## Cost Estimate

- Render Backend: $7/month
- Vercel Frontend: Free tier available
- MongoDB Atlas: Free tier available
- Domain: $10-15/year
- **Total: $7/month + domain**

---

For questions, contact: arshiranjeet133@gmail.com
