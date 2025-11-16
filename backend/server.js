const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'govindayadav2478@gmail.com',
        pass: 'vboj hawo vwbh skum', // Gmail app password
    },
});

// Validation helper
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'Krishnawanshi Overseas Backend API Running',
        version: '1.0.0'
    });
});

// General contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, message, type } = req.body;

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: firstName, lastName, email, message'
            });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        const fullName = `${firstName} ${lastName}`;
        const subject = type === 'product_inquiry'
            ? `Product Inquiry from ${fullName}`
            : `Contact Form Submission from ${fullName}`;

        const emailText = `
Name: ${fullName}
Email: ${email}
Message: ${message}
${type === 'product_inquiry' ? '\nType: Product Inquiry' : ''}
        `.trim();

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #475569; }
        .value { color: #0f172a; margin-top: 5px; }
        .footer { background: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b; border-radius: 0 0 8px 8px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>${type === 'product_inquiry' ? 'Product Inquiry' : 'Contact Form Submission'}</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Name:</div>
                <div class="value">${fullName}</div>
            </div>
            <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
            </div>
            <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
            </div>
        </div>
        <div class="footer">
            <p>This email was sent from the Krishnawanshi Overseas website contact form.</p>
        </div>
    </div>
</body>
</html>
        `;

        await transporter.sendMail({
            from: 'Krishnawanshi Overseas Website <govindayadav2478@gmail.com>',
            to: 'reyanshscientificworks@gmail.com',
            replyTo: email,
            subject: subject,
            text: emailText,
            html: emailHtml,
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send email. Please try again later.'
        });
    }
});

// Product inquiry endpoint (dedicated endpoint for product inquiries)
app.post('/api/product-inquiry', async (req, res) => {
    try {
        const {
            name,
            email,
            company,
            phone,
            country,
            message,
            products,
            subject
        } = req.body;

        // Validation
        const errors = [];
        if (!name || name.trim().length < 2) {
            errors.push('Name is required and must be at least 2 characters');
        }
        if (!email || !validateEmail(email)) {
            errors.push('Valid email is required');
        }
        if (!phone || !validatePhone(phone)) {
            errors.push('Valid phone number is required (minimum 10 digits)');
        }
        if (!country || country.trim().length < 2) {
            errors.push('Country is required');
        }
        if (!message || message.trim().length < 10) {
            errors.push('Message is required and must be at least 10 characters');
        }
        if (!products || (Array.isArray(products) && products.length === 0)) {
            errors.push('At least one product must be selected');
        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                errors: errors
            });
        }

        const productList = Array.isArray(products)
            ? products.map(p => typeof p === 'string' ? p : p.name || p).join(', ')
            : products;

        const emailSubject = subject || `Product Inquiry - ${productList}`;

        const emailText = `
PRODUCT INQUIRY REQUEST
========================

CONTACT INFORMATION:
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Phone: ${phone}
Country: ${country}

PRODUCTS OF INTEREST:
${productList}

MESSAGE / REQUIREMENTS / NEGOTIATIONS:
${message}

---
This inquiry was submitted through the Krishnawanshi Overseas website.
Please respond to: ${email}
        `.trim();

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f1f5f9; }
        .container { max-width: 700px; margin: 20px auto; padding: 0; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%); color: #ffffff; padding: 30px; text-align: center; }
        .logo-container { margin-bottom: 15px; }
        .logo-box { display: inline-block; width: 80px; height: 80px; background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-weight: 700; font-size: 12px; text-align: center; line-height: 1.2; }
        .header h1 { margin: 0; font-size: 24px; font-weight: 700; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e2e8f0; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #2563eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: 600; color: #475569; font-size: 14px; margin-bottom: 5px; }
        .value { color: #0f172a; font-size: 15px; padding: 8px 12px; background: #f8fafc; border-radius: 6px; border-left: 3px solid #2563eb; }
        .products-box { background: #eff6ff; border: 1px solid #bfdbfe; padding: 15px; border-radius: 8px; margin-top: 10px; }
        .product-item { background: #ffffff; padding: 10px; margin: 5px 0; border-radius: 4px; border-left: 3px solid #2563eb; }
        .message-box { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 3px solid #2563eb; white-space: pre-wrap; }
        .footer { background: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .action-button { display: inline-block; margin-top: 15px; padding: 12px 24px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo-container">
                <div class="logo-box">Krishnawanshi<br/>Overseas</div>
            </div>
            <h1>🔬 Product Inquiry Request</h1>
            <p>New inquiry from Krishnawanshi Overseas website</p>
        </div>
        <div class="content">
            <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                    <div class="label">Full Name:</div>
                    <div class="value">${name}</div>
                </div>
                <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></div>
                </div>
                <div class="field">
                    <div class="label">Company/Organization:</div>
                    <div class="value">${company || 'Not provided'}</div>
                </div>
                <div class="field">
                    <div class="label">Phone:</div>
                    <div class="value"><a href="tel:${phone}" style="color: #2563eb;">${phone}</a></div>
                </div>
                <div class="field">
                    <div class="label">Country:</div>
                    <div class="value">${country}</div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Products of Interest</div>
                <div class="products-box">
                    ${Array.isArray(products)
                ? products.map(p => {
                    const productName = typeof p === 'string' ? p : p.name || p;
                    return `<div class="product-item">${productName}</div>`;
                }).join('')
                : `<div class="product-item">${productList}</div>`
            }
                </div>
            </div>

            <div class="section">
                <div class="section-title">Message / Requirements / Negotiations</div>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${email}?subject=Re: ${emailSubject}" class="action-button">Reply to Inquiry</a>
            </div>
        </div>
        <div class="footer">
            <p><strong>Krishnawanshi Overseas</strong> - Scientific Glassware Manufacturer</p>
            <p>This email was automatically generated from the website contact form.</p>
            <p style="margin-top: 10px;">Response Email: <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
        </div>
    </div>
</body>
</html>
        `;

        console.log('Attempting to send email...');
        console.log('From:', 'govindayadav2478@gmail.com');
        console.log('To:', 'reyanshscientificworks@gmail.com');
        console.log('Subject:', emailSubject);

        const mailResult = await transporter.sendMail({
            from: 'Krishnawanshi Overseas Website <govindayadav2478@gmail.com>',
            to: 'reyanshscientificworks@gmail.com',
            replyTo: email,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
        });

        console.log('Email sent successfully!');
        console.log('Message ID:', mailResult.messageId);
        console.log('Response:', mailResult.response);

        res.status(200).json({
            success: true,
            message: 'Product inquiry sent successfully. We will contact you soon!'
        });
    } catch (error) {
        console.error('Product inquiry error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        res.status(500).json({
            success: false,
            error: 'Failed to send inquiry. Please try again later.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`✅ Krishnawanshi Overseas Backend API running on port ${PORT}`);
    console.log(`📧 Email service configured`);
}); 
