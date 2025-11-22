# Krishnawanshi Overseas Backend API

## Overview
Backend API for Krishnawanshi Overseas website handling contact forms and product inquiries.

## Endpoints

### 1. Health Check
- **GET** `/`
- Returns API status and version

### 2. General Contact Form
- **POST** `/api/contact`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "Your message here"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Email sent successfully"
  }
  ```

### 3. Product Inquiry
- **POST** `/api/product-inquiry`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "company": "ABC Corp",
    "phone": "+91 9876543210",
    "country": "India",
    "message": "I need 100 beakers...",
    "products": [
      {"name": "Beaker", "desc": "100ml, 250ml"},
      {"name": "Flask", "desc": "500ml"}
    ],
    "subject": "Product Inquiry - 2 product(s)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Product inquiry sent successfully. We will contact you soon!"
  }
  ```

## Validation

### Contact Form
- `firstName`: Required, min 2 characters
- `lastName`: Required, min 2 characters
- `email`: Required, valid email format
- `message`: Required

### Product Inquiry
- `name`: Required, min 2 characters
- `email`: Required, valid email format
- `phone`: Required, min 10 digits
- `country`: Required, min 2 characters
- `message`: Required, min 10 characters
- `products`: Required, at least one product

## Email Configuration

The server uses environment variables for email configuration. See `ENV_SETUP.md` for detailed setup instructions.

**Required Environment Variables:**
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASSWORD`: Gmail App Password (not your regular password)
- `RECIPIENT_EMAIL`: Email address to receive contact form submissions

**Optional Environment Variables:**
- `EMAIL_SERVICE`: Email service (defaults to 'gmail')
- `PORT`: Server port (defaults to 8080)
- `NODE_ENV`: Environment mode (defaults to 'production')

## Error Handling
All endpoints return:
- `400`: Validation errors
- `500`: Server errors

Error response format:
```json
{
  "success": false,
  "error": "Error message",
  "errors": ["Error 1", "Error 2"] // For validation errors
}
```

## Running the Server

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the `backend` directory:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECIPIENT_EMAIL=recipient@gmail.com
PORT=8080
NODE_ENV=development
```

3. Start the server:
```bash
npm start
```

Server runs on port 8080 (or PORT environment variable).

### Production (Render)

1. Set environment variables in Render dashboard (see `ENV_SETUP.md`)
2. Deploy to Render
3. Server will automatically use environment variables

**Note:** For Gmail, you must use an App Password, not your regular password. See `ENV_SETUP.md` for instructions.

