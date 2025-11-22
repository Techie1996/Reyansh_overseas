# Environment Variables Setup for Render

## Required Environment Variables

To deploy this backend on Render, you need to set the following environment variables in your Render dashboard:

### Email Configuration (Resend API)

1. **RESEND_API_KEY** (required)
   - Your Resend API key
   - Get it from: https://resend.com/api-keys
   - Example: `re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA`

2. **FROM_EMAIL** (required)
   - Email address to send from
   - For testing: `onboarding@resend.dev`
   - For production: Use your verified domain (e.g., `noreply@yourdomain.com`)
   - Example: `onboarding@resend.dev`

3. **RECIPIENT_EMAIL** (required)
   - Email address where contact form submissions will be sent
   - Example: `reyanshscientificworks@gmail.com`

### Server Configuration

5. **PORT** (optional, defaults to 8080)
   - Port number for the server
   - Render will automatically set this, but you can override if needed

6. **NODE_ENV** (optional, defaults to 'production')
   - Environment mode
   - Set to `production` for Render

## How to Set Environment Variables on Render

1. Go to your Render dashboard
2. Select your backend service
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Add each variable with its value
6. Save and redeploy

## Example .env file (for local development)

Create a `.env` file in the `backend` directory:

```
RESEND_API_KEY=re_jPZGoJuF_D4sGBstPYhB9XgDVxPQYEqfA
FROM_EMAIL=onboarding@resend.dev
RECIPIENT_EMAIL=reyanshscientificworks@gmail.com
PORT=8080
NODE_ENV=development
```

**Important:** Never commit the `.env` file to git! It's already in `.gitignore`.

## Troubleshooting

### Email not sending on Render

1. **Check Resend API Key**: Verify `RESEND_API_KEY` is set correctly in Render
2. **Check FROM_EMAIL**: Ensure it's set to `onboarding@resend.dev` or your verified domain
3. **Check Environment Variables**: Verify all environment variables are set correctly in Render
4. **Check Logs**: View Render logs to see detailed error messages
5. **Verify Domain**: If using custom domain, ensure it's verified in Resend dashboard

### Common Errors

- **401 Unauthorized**: Invalid API key - Check your RESEND_API_KEY
- **422 Unprocessable**: Invalid email format or domain not verified
- **429 Too Many Requests**: Rate limit exceeded (100 emails/day on free tier)
- **Domain not verified**: Use `onboarding@resend.dev` for testing or verify your domain

## Security Notes

- Never commit credentials to git
- Use App Passwords instead of regular passwords
- Rotate App Passwords regularly
- Use environment variables for all sensitive data

