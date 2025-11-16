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
- **Service:** Gmail
- **From:** govindayadav2478@gmail.com
- **To:** reyanshscientificworks@gmail.com
- **Reply-To:** Customer's email

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

```bash
npm install
npm start
```

Server runs on port 8080 (or PORT environment variable).

