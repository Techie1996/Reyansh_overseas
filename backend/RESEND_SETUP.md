# Resend API Setup Guide

## Overview

The backend now uses Resend API instead of SMTP for reliable email delivery on Render and other cloud platforms.

## Environment Variables

Set these in your Render dashboard (Environment tab):

### Required Variables

```
RESEND_API_KEY=re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA
FROM_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=reyanshscientificworks@gmail.com
```

### Optional Variables

```
PORT=8080
NODE_ENV=production
```

## Resend Setup Steps

### 1. Get Your API Key

Your API key is already provided: `re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA`

You can manage it at: https://resend.com/api-keys

### 2. Verify Your Domain (Recommended)

For production use, you should verify your domain:

1. Go to https://resend.com/domains
2. Add your domain (e.g., `krishnawanshioverseas.com`)
3. Add the DNS records provided by Resend
4. Wait for verification (usually a few minutes)
5. Update `FROM_EMAIL` to use your verified domain:
   ```
   FROM_EMAIL=noreply@krishnawanshioverseas.com
   ```

### 3. Using Default Email (Quick Start)

For testing/development, you can use Resend's default email:
```
FROM_EMAIL=onboarding@resend.dev
```

**Note:** Emails from `onboarding@resend.dev` may go to spam. Verify your domain for better deliverability.

## Render Deployment

1. **Set Environment Variables** in Render dashboard:
   - Go to your service → Environment tab
   - Add all required variables
   - Save and redeploy

2. **Deploy the Code**:
   - Push your changes to git
   - Render will automatically redeploy
   - Check logs to verify Resend is working

## Testing

### Test Contact Form

```bash
curl -X POST https://your-backend.onrender.com/api/contact \
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
curl -X POST https://your-backend.onrender.com/api/product-inquiry \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 9876543210",
    "country": "India",
    "message": "Test inquiry message",
    "products": [{"name": "Beaker", "desc": "100ml"}]
  }'
```

## Benefits of Resend

✅ **Reliable**: Works perfectly on Render and other cloud platforms  
✅ **No SMTP Issues**: No connection timeouts or authentication problems  
✅ **Better Deliverability**: Professional email delivery service  
✅ **Easy Setup**: Just API key, no complex SMTP configuration  
✅ **Analytics**: Track email delivery and opens (with Resend dashboard)  
✅ **Rate Limits**: 100 emails/day on free tier, more on paid plans  

## Troubleshooting

### Emails Not Sending

1. **Check API Key**: Verify `RESEND_API_KEY` is set correctly
2. **Check Logs**: View Render logs for error messages
3. **Verify Domain**: If using custom domain, ensure it's verified
4. **Check Rate Limits**: Free tier has 100 emails/day limit

### Common Errors

- **401 Unauthorized**: Invalid API key
- **422 Unprocessable**: Invalid email format or domain not verified
- **429 Too Many Requests**: Rate limit exceeded
- **Domain not verified**: Use `onboarding@resend.dev` or verify your domain

### Error Messages

The server will log detailed error messages. Check Render logs for:
- API key validation
- Email sending status
- Retry attempts
- Final success/failure

## Migration from SMTP

✅ **Completed**:
- Removed nodemailer dependency
- Added Resend SDK
- Updated all email sending code
- Added retry logic
- Updated error handling

## Next Steps

1. Set environment variables on Render
2. Test email sending
3. (Optional) Verify your domain for better deliverability
4. Monitor email delivery in Resend dashboard

## Support

- Resend Docs: https://resend.com/docs
- Resend Dashboard: https://resend.com/emails
- API Keys: https://resend.com/api-keys

