# Resend API Migration Guide

## ✅ Migration Complete!

The backend has been successfully migrated from SMTP (Gmail) to Resend API for reliable email delivery on Render.

## What Changed

### Before (SMTP)
- Used nodemailer with Gmail SMTP
- Had connection issues on Render
- Required Gmail App Passwords
- Complex authentication setup

### After (Resend API)
- Uses Resend SDK
- Works reliably on Render
- Simple API key authentication
- Better deliverability and analytics

## Quick Setup for Render

### Step 1: Set Environment Variables

Go to Render Dashboard → Your Backend Service → Environment tab and add:

```
RESEND_API_KEY=re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA
FROM_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=reyanshscientificworks@gmail.com
```

### Step 2: Deploy

1. Commit and push your changes
2. Render will automatically redeploy
3. Check logs to verify Resend is working

### Step 3: Test

Test both forms:
- Contact form: Fill out and submit
- Product inquiry: Add products and submit inquiry

## Environment Variables Explained

### RESEND_API_KEY (Required)
- Your Resend API key
- Get it from: https://resend.com/api-keys
- Current key: `re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA`

### FROM_EMAIL (Required)
- Email address to send from
- For testing: `onboarding@resend.dev`
- For production: Verify your domain and use `noreply@yourdomain.com`

### RECIPIENT_EMAIL (Required)
- Where to send contact form submissions
- Current: `reyanshscientificworks@gmail.com`

## Domain Verification (Optional but Recommended)

For better deliverability:

1. Go to https://resend.com/domains
2. Add your domain (e.g., `krishnawanshioverseas.com`)
3. Add DNS records provided by Resend
4. Wait for verification
5. Update `FROM_EMAIL` to use your domain:
   ```
   FROM_EMAIL=noreply@krishnawanshioverseas.com
   ```

## Benefits

✅ **Reliable**: No more SMTP connection issues  
✅ **Fast**: API-based, no connection pooling needed  
✅ **Better Deliverability**: Professional email service  
✅ **Analytics**: Track emails in Resend dashboard  
✅ **Simple**: Just API key, no complex setup  
✅ **Works on Render**: No firewall or port issues  

## Testing

### Test Contact Form
```bash
curl -X POST https://reyansh-overseas.onrender.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Test Product Inquiry
```bash
curl -X POST https://reyansh-overseas.onrender.com/api/product-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "country": "India",
    "message": "Test inquiry",
    "products": [{"name": "Beaker", "desc": "100ml"}]
  }'
```

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is correct
2. **Check Logs**: View Render logs for error messages
3. **Check Rate Limits**: Free tier has 100 emails/day
4. **Verify Domain**: If using custom domain, ensure it's verified

### Common Errors

- **401 Unauthorized**: Invalid API key
- **422 Unprocessable**: Invalid email or domain not verified
- **429 Too Many Requests**: Rate limit exceeded

## Files Updated

- ✅ `backend/server.js` - Migrated to Resend API
- ✅ `backend/package.json` - Added Resend, removed nodemailer
- ✅ `backend/README.md` - Updated documentation
- ✅ `backend/ENV_SETUP.md` - Updated environment variables
- ✅ `backend/RESEND_SETUP.md` - New setup guide

## Next Steps

1. ✅ Set environment variables on Render
2. ✅ Test email sending
3. ⏳ (Optional) Verify your domain for better deliverability
4. ⏳ Monitor email delivery in Resend dashboard

## Support

- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/emails
- API Keys: https://resend.com/api-keys

Your email system is now ready to work reliably on Render! 🚀

