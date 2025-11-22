# Deployment Guide - Email Fix for Render

## Problem Fixed

The email functionality was not working on Render due to:
1. Hardcoded email credentials (security issue)
2. No retry logic for failed email sends
3. No environment variable support
4. Poor error handling

## Changes Made

### Backend (`backend/server.js`)

1. **Added Environment Variable Support**
   - Uses `dotenv` to load environment variables
   - Email credentials now come from environment variables
   - Falls back to defaults for local development

2. **Added Retry Logic**
   - Email sending now retries up to 3 times with exponential backoff
   - Better error logging for debugging

3. **Improved Error Handling**
   - Better error messages
   - Detailed logging for troubleshooting
   - SMTP connection verification before sending

4. **Better Connection Settings**
   - Added connection pooling
   - Optimized timeouts for Render
   - Rate limiting to prevent spam

### Frontend

1. **Environment Variable Support**
   - `contact-form.js` now uses `NEXT_PUBLIC_API_URL`
   - `ProductInquiry.js` now uses `NEXT_PUBLIC_API_URL`
   - Falls back to Render URL if not set

## Setup Instructions

### Step 1: Backend Environment Variables on Render

Go to your Render dashboard → Backend Service → Environment tab and add:

```
EMAIL_USER=govindayadav2478@gmail.com
EMAIL_PASSWORD=vboj hawo vwbh skum
RECIPIENT_EMAIL=reyanshscientificworks@gmail.com
EMAIL_SERVICE=gmail
NODE_ENV=production
```

**Important:** 
- `EMAIL_PASSWORD` must be a Gmail App Password, not your regular password
- To generate: https://myaccount.google.com/apppasswords
- Enable 2-Step Verification first

### Step 2: Frontend Environment Variables (Optional)

If your backend URL changes, add to your frontend deployment:

```
NEXT_PUBLIC_API_URL=https://reyansh-overseas.onrender.com
```

### Step 3: Install Dependencies

The backend now requires `dotenv`. It should be installed automatically, but if not:

```bash
cd backend
npm install
```

### Step 4: Redeploy

1. Commit all changes
2. Push to your repository
3. Render will automatically redeploy
4. Check logs to verify email configuration

## Testing

### Test Contact Form

1. Go to your website
2. Fill out the contact form
3. Submit
4. Check Render logs for email sending status
5. Check recipient email inbox

### Test Product Inquiry

1. Add products to inquiry cart
2. Open inquiry form
3. Fill out all required fields
4. Submit
5. Check Render logs and recipient email

## Troubleshooting

### Email Not Sending

1. **Check Render Logs**
   - Look for "SMTP connection verified" message
   - Check for error messages

2. **Verify Environment Variables**
   - Go to Render dashboard → Environment
   - Ensure all variables are set correctly
   - No extra spaces or quotes

3. **Check Gmail App Password**
   - Must be 16 characters (spaces are ignored)
   - Must be generated from Google Account settings
   - 2-Step Verification must be enabled

4. **Common Errors**
   - `EAUTH`: Wrong email or password
   - `ETIMEDOUT`: Network/connection issue
   - `ECONNREFUSED`: Gmail blocking connection

### Server Not Starting

1. Check `package.json` includes `dotenv`
2. Check server logs for syntax errors
3. Verify PORT environment variable is set

### Frontend Can't Connect

1. Check `NEXT_PUBLIC_API_URL` is set correctly
2. Verify backend is running on Render
3. Check CORS settings in backend
4. Test backend health endpoint: `https://reyansh-overseas.onrender.com/`

## Files Modified

- `backend/server.js` - Added env vars, retry logic, better error handling
- `backend/package.json` - Added dotenv dependency
- `src/app/contact-form.js` - Added environment variable support
- `src/app/components/ProductInquiry.js` - Added environment variable support
- `backend/README.md` - Updated with env var instructions
- `backend/ENV_SETUP.md` - New file with detailed setup guide

## Security Notes

- Never commit `.env` files
- Use App Passwords, not regular passwords
- Rotate credentials regularly
- Use environment variables for all sensitive data

## Next Steps

1. Set environment variables on Render
2. Redeploy backend
3. Test contact form
4. Test product inquiry form
5. Monitor logs for any issues

