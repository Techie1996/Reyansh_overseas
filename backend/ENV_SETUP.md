# Environment Variables Setup for Render

## Required Environment Variables

To deploy this backend on Render, you need to set the following environment variables in your Render dashboard:

### Email Configuration

1. **EMAIL_SERVICE** (optional, defaults to 'gmail')
   - Email service provider
   - Example: `gmail`

2. **EMAIL_USER** (required)
   - Your Gmail address
   - Example: `your-email@gmail.com`

3. **EMAIL_PASSWORD** (required)
   - Gmail App Password (NOT your regular password)
   - To generate an App Password:
     1. Go to https://myaccount.google.com/
     2. Enable 2-Step Verification if not already enabled
     3. Go to https://myaccount.google.com/apppasswords
     4. Generate a new app password for "Mail"
     5. Copy the 16-character password (spaces will be removed automatically)
   - Example: `abcd efgh ijkl mnop`

4. **RECIPIENT_EMAIL** (optional, defaults to 'reyanshscientificworks@gmail.com')
   - Email address where contact form submissions will be sent
   - Example: `your-recipient@gmail.com`

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
EMAIL_SERVICE=gmail
EMAIL_USER=govindayadav2478@gmail.com
EMAIL_PASSWORD=vboj hawo vwbh skum
RECIPIENT_EMAIL=reyanshscientificworks@gmail.com
PORT=8080
NODE_ENV=development
```

**Important:** Never commit the `.env` file to git! It's already in `.gitignore`.

## Troubleshooting

### Email not sending on Render

1. **Check Gmail App Password**: Make sure you're using an App Password, not your regular Gmail password
2. **Check 2-Step Verification**: App Passwords only work if 2-Step Verification is enabled
3. **Check Environment Variables**: Verify all environment variables are set correctly in Render
4. **Check Logs**: View Render logs to see detailed error messages
5. **Test Connection**: The server will log SMTP verification status on startup

### Common Errors

- **EAUTH**: Authentication failed - Check your EMAIL_USER and EMAIL_PASSWORD
- **ETIMEDOUT**: Connection timeout - Check your internet connection or Gmail service status
- **ECONNREFUSED**: Connection refused - Gmail may be blocking the connection

## Security Notes

- Never commit credentials to git
- Use App Passwords instead of regular passwords
- Rotate App Passwords regularly
- Use environment variables for all sensitive data

