// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email sender setup (use your email credentials here)
const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'smtp.mailtrap.io' for testing
  auth: {
    user: 'codeforcerdev@gmail.com',      // 🔁 replace with your email
    pass: 'nlxpaopiqnkfvjah'  // 🔁 use an app password if using Gmail
  }
});

// Enhanced HTML email template generator
function generateEmailTemplate(business_name, business_address, cart_items) {
  const totalAmount = cart_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const itemsHTML = cart_items.map(item => `
    <tr>
      <td style="padding: 15px; border-bottom: 1px solid #e0e0e0;">
        <div style="display: flex; align-items: center;">
          <div style="flex: 1;">
            <h4 style="margin: 0 0 5px 0; color: #2c3e50; font-size: 16px; font-weight: 600;">${item.title}</h4>
            <p style="margin: 0; color: #7f8c8d; font-size: 14px;">Quantity: ${item.quantity}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; color: #27ae60; font-size: 18px; font-weight: 700;">₦${(item.price * item.quantity).toLocaleString()}</p>
            <p style="margin: 0; color: #95a5a6; font-size: 12px;">₦${item.price.toLocaleString()} each</p>
          </div>
        </div>
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Order - Smoodi</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); margin-top: 20px; margin-bottom: 20px;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50px; left: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; animation: float 3s ease-in-out infinite;"></div>
          <div style="position: absolute; top: 20px; right: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; animation: float 2s ease-in-out infinite reverse;"></div>
          
          <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; backdrop-filter: blur(10px);">
            <div style="font-size: 36px;">🛒</div>
          </div>
          
          <h1 style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
            SMOODI
          </h1>
          <p style="color: rgba(255,255,255,0.9); font-size: 18px; margin: 10px 0 0 0; font-weight: 300;">
            New Order Received
          </p>
        </div>

        <!-- Order Details Section -->
        <div style="padding: 40px 30px 20px;">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 25px; border-radius: 15px; margin-bottom: 30px; color: white; text-align: center;">
            <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 600;">
              🎉 Order Confirmed!
            </h2>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">
              ${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>

          <!-- Customer Information -->
          <div style="background: #f8f9fa; padding: 25px; border-radius: 15px; margin-bottom: 30px; border-left: 5px solid #667eea;">
            <h3 style="color: #2c3e50; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
              <span style="margin-right: 10px;">👤</span>
              Customer Information
            </h3>
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; align-items: center;">
                <span style="color: #7f8c8d; font-weight: 500; width: 120px; font-size: 14px;">Business Name:</span>
                <span style="color: #2c3e50; font-weight: 600; font-size: 16px;">${business_name}</span>
              </div>
              <div style="display: flex; align-items: flex-start;">
                <span style="color: #7f8c8d; font-weight: 500; width: 120px; font-size: 14px; margin-top: 2px;">Address:</span>
                <span style="color: #2c3e50; font-weight: 600; font-size: 16px; line-height: 1.5;">${business_address}</span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div style="background: #ffffff; border-radius: 15px; overflow: hidden; border: 1px solid #e0e0e0; margin-bottom: 30px;">
            <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; text-align: center;">
              <h3 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; display: flex; align-items: center; justify-content: center;">
                <span style="margin-right: 10px;">📦</span>
                Order Items
              </h3>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHTML}
            </table>
          </div>

          <!-- Order Summary -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 15px; color: white; text-align: center; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">Order Summary</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; backdrop-filter: blur(10px);">
              <span style="font-size: 18px; font-weight: 500;">Total Items:</span>
              <span style="font-size: 18px; font-weight: 700;">${cart_items.length}</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 10px; backdrop-filter: blur(10px);">
              <span style="font-size: 20px; font-weight: 600;">Total Amount:</span>
              <span style="font-size: 24px; font-weight: 800;">₦${totalAmount.toLocaleString()}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="display: inline-flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
              <a href="#" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
                📋 Process Order
              </a>
              <a href="#" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(240, 147, 251, 0.4); transition: all 0.3s ease;">
                📞 Contact Customer
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%); padding: 30px; text-align: center; color: white;">
          <h3 style="margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">SMOODI</h3>
          <p style="margin: 0 0 15px 0; color: rgba(255,255,255,0.8); font-size: 14px;">
            Your trusted partner in business solutions
          </p>
          <div style="display: flex; justify-content: center; gap: 20px; margin-top: 20px;">
            <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">📧 Support</a>
            <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">🌐 Website</a>
            <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 14px;">📱 Mobile App</a>
          </div>
          <p style="margin: 20px 0 0 0; color: rgba(255,255,255,0.6); font-size: 12px;">
            © 2025 Smoodi. All rights reserved.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

app.post('/submit-cart', (req, res) => {
  const { business_name, business_address, cart_items } = req.body;

  // Generate beautiful HTML email
  const htmlTemplate = generateEmailTemplate(business_name, business_address, cart_items);

  // Simple text version for fallback
  const itemList = cart_items.map(item => {
    return `- ${item.title} (Qty: ${item.quantity}, Price: ₦${item.price})`;
  }).join('\n');

  const textMessage = `
🛒 New Checkout Submission - SMOODI

📛 Business Name: ${business_name}
📍 Address: ${business_address}

📦 Items:
${itemList}

💰 Total: ₦${cart_items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}
`;

  const mailOptions = {
    from: 'codeforcerdev@gmail.com',
    to: 'codeforcerdev@gmail.com',
    subject: '🛒 New Smoodi Order - Order Confirmation',
    text: textMessage,
    html: htmlTemplate
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }
    console.log('✅ Email sent successfully:', info.messageId);
    return res.status(200).json({ success: true, message: 'Beautiful email sent!' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Smoodi Server running on http://localhost:${PORT}`);
  console.log(`📧 Enhanced email templates ready!`);
});