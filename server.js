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
// Enhanced HTML email template generator with green theme and responsive design
function generateEmailTemplate(business_name, business_address, cart_items) {
  const totalAmount = cart_items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const itemsHTML = cart_items.map(item => `
    <tr>
      <td style="padding: 20px 15px; border-bottom: 1px solid #e8f5e8;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="vertical-align: top; width: 70%;">
              <h4 style="margin: 0 0 8px 0; color: #1a5c1a; font-size: 18px; font-weight: 600; line-height: 1.3;">${item.title}</h4>
              <p style="margin: 0; color: #4a7c4a; font-size: 14px; font-weight: 500;">
                <span style="display: inline-block; background: #e8f5e8; padding: 4px 12px; border-radius: 20px; font-size: 13px;">
                  Qty: ${item.quantity}
                </span>
              </p>
            </td>
            <td style="text-align: right; vertical-align: top; width: 30%;">
              <p style="margin: 0 0 5px 0; color: #27ae60; font-size: 20px; font-weight: 800;">₦${(item.price * item.quantity).toLocaleString()}</p>
              <p style="margin: 0; color: #6b9b6b; font-size: 13px;">₦${item.price.toLocaleString()} each</p>
            </td>
          </tr>
        </table>
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
      <style>
        @media only screen and (max-width: 600px) {
          .container {
            width: 100% !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }
          .header {
            padding: 30px 20px !important;
          }
          .content {
            padding: 30px 20px !important;
          }
          .footer {
            padding: 25px 20px !important;
          }
          .button-container {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .button {
            width: 100% !important;
            text-align: center !important;
            padding: 18px 20px !important;
            font-size: 16px !important;
          }
          .customer-info {
            display: block !important;
          }
          .customer-info span {
            display: block !important;
            width: 100% !important;
            margin-bottom: 8px !important;
          }
          .order-summary-flex {
            flex-direction: column !important;
            gap: 15px !important;
          }
          .summary-item {
            margin-top: 0 !important;
          }
          .logo-title {
            font-size: 28px !important;
          }
          .hero-subtitle {
            font-size: 16px !important;
          }
        }
        
        @media only screen and (max-width: 480px) {
          .header {
            padding: 25px 15px !important;
          }
          .content {
            padding: 25px 15px !important;
          }
          .footer {
            padding: 20px 15px !important;
          }
          .logo-title {
            font-size: 24px !important;
          }
          .hero-subtitle {
            font-size: 14px !important;
          }
        }
      </style>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background: linear-gradient(135deg, #a8e6cf 0%, #dcedc8 50%, #f1f8e9 100%); min-height: 100vh; line-height: 1.6;">
      <div class="container" style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 60px rgba(46, 125, 50, 0.15), 0 8px 20px rgba(46, 125, 50, 0.1);">
        
        <!-- Header Section -->
        <div class="header" style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #43a047 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
          <!-- Animated Background Elements -->
          <div style="position: absolute; top: -30px; left: -30px; width: 80px; height: 80px; background: linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)); border-radius: 50%; animation: float 4s ease-in-out infinite;"></div>
          <div style="position: absolute; top: 10px; right: -20px; width: 60px; height: 60px; background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); border-radius: 50%; animation: float 3s ease-in-out infinite reverse;"></div>
          <div style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)); border-radius: 50%; animation: float 5s ease-in-out infinite;"></div>
          
          <!-- Logo Container -->
          <div style="background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.15)); width: 90px; height: 90px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px; backdrop-filter: blur(20px); border: 2px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
            <div style="font-size: 40px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">🛒</div>
          </div>
          
          <!-- Title and Subtitle -->
          <h1 class="logo-title" style="color: #ffffff; font-size: 32px; margin: 0; font-weight: 800; text-shadow: 0 2px 8px rgba(0,0,0,0.2); letter-spacing: 2px;">
            SMOODI
          </h1>
          <p class="hero-subtitle" style="color: rgba(255,255,255,0.95); font-size: 18px; margin: 12px 0 0 0; font-weight: 400; text-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            ✨ New Order Received
          </p>
        </div>

        <!-- Content Section -->
        <div class="content" style="padding: 40px 30px;">
          
          <!-- Success Banner -->
          <div style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 50%, #81c784 100%); padding: 25px; border-radius: 16px; margin-bottom: 32px; color: white; text-align: center; box-shadow: 0 4px 20px rgba(76, 175, 80, 0.3); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"2\"/></svg>') center/cover; opacity: 0.3;"></div>
            <div style="position: relative; z-index: 1;">
              <h2 style="margin: 0 0 12px 0; font-size: 26px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <span style="font-size: 24px;">🎉</span>
                Order Confirmed!
              </h2>
              <p style="margin: 0; font-size: 16px; opacity: 0.95; font-weight: 400;">
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
          </div>

          <!-- Customer Information -->
          <div style="background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e8 100%); padding: 28px; border-radius: 16px; margin-bottom: 32px; border-left: 6px solid #4caf50; box-shadow: 0 2px 12px rgba(76, 175, 80, 0.1);">
            <h3 style="color: #1b5e20; margin: 0 0 24px 0; font-size: 22px; font-weight: 700; display: flex; align-items: center; gap: 12px;">
              <span style="background: #4caf50; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px;">👤</span>
              Customer Information
            </h3>
            <div style="display: flex; flex-direction: column; gap: 18px;">
              <div class="customer-info" style="display: flex; align-items: center; gap: 15px;">
                <span style="color: #2e7d32; font-weight: 600; min-width: 130px; font-size: 15px; background: #e8f5e8; padding: 8px 16px; border-radius: 25px; display: inline-block;">Business Name:</span>
                <span style="color: #1b5e20; font-weight: 700; font-size: 17px; flex: 1;">${business_name}</span>
              </div>
              <div class="customer-info" style="display: flex; align-items: flex-start; gap: 15px;">
                <span style="color: #2e7d32; font-weight: 600; min-width: 130px; font-size: 15px; background: #e8f5e8; padding: 8px 16px; border-radius: 25px; display: inline-block; margin-top: 2px;">Address:</span>
                <span style="color: #1b5e20; font-weight: 700; font-size: 17px; line-height: 1.6; flex: 1;">${business_address}</span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div style="background: #ffffff; border-radius: 16px; overflow: hidden; border: 2px solid #e8f5e8; margin-bottom: 32px; box-shadow: 0 4px 20px rgba(76, 175, 80, 0.08);">
            <div style="background: linear-gradient(135deg, #388e3c 0%, #4caf50 50%, #66bb6a 100%); padding: 24px; text-align: center; position: relative;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px); opacity: 0.3;"></div>
              <h3 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 12px; position: relative; z-index: 1;">
                <span style="background: rgba(255,255,255,0.2); padding: 6px; border-radius: 8px; font-size: 20px;">📦</span>
                Order Items
              </h3>
            </div>
            <table style="width: 100%; border-collapse: collapse; background: #ffffff;">
              ${itemsHTML}
            </table>
          </div>

          <!-- Order Summary -->
          <div style="background: linear-gradient(135deg, #2e7d32 0%, #388e3c 50%, #43a047 100%); padding: 30px; border-radius: 16px; color: white; margin-bottom: 32px; box-shadow: 0 6px 25px rgba(46, 125, 50, 0.3); position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05)); border-radius: 50%; animation: float 6s ease-in-out infinite;"></div>
            <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 700; text-align: center; position: relative; z-index: 1;">📊 Order Summary</h3>
            <div class="order-summary-flex" style="display: flex; flex-direction: column; gap: 16px; position: relative; z-index: 1;">
              <div style="display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08)); padding: 18px 24px; border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1);">
                <span style="font-size: 18px; font-weight: 600; display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 16px;">📋</span>
                  Total Items:
                </span>
                <span style="font-size: 20px; font-weight: 800; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 25px;">${cart_items.length}</span>
              </div>
              <div class="summary-item" style="display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1)); padding: 20px 24px; border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); margin-top: 5px;">
                <span style="font-size: 20px; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 18px;">💰</span>
                  Total Amount:
                </span>
                <span style="font-size: 26px; font-weight: 900; background: rgba(255,255,255,0.25); padding: 10px 20px; border-radius: 30px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">₦${totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="text-align: center; margin-bottom: 20px;">
            <div class="button-container" style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
              <a href="#" class="button" style="background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%); color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(76, 175, 80, 0.4); transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; border: 2px solid rgba(255,255,255,0.2);">
                <span style="font-size: 18px;">📋</span>
                Process Order
              </a>
              <a href="#" class="button" style="background: linear-gradient(135deg, #388e3c 0%, #2e7d32 100%); color: white; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(56, 142, 60, 0.4); transition: all 0.3s ease; display: inline-flex; align-items: center; gap: 10px; border: 2px solid rgba(255,255,255,0.2);">
                <span style="font-size: 18px;">📞</span>
                Contact Customer
              </a>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="footer" style="background: linear-gradient(135deg, #1b5e20 0%, #2e7d32 50%, #388e3c 100%); padding: 35px 30px; text-align: center; color: white; position: relative; overflow: hidden;">
          <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><polygon points=\"50,10 90,90 10,90\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"1\"/></svg>') center/cover; opacity: 0.3;"></div>
          <div style="position: relative; z-index: 1;">
            <h3 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 800; letter-spacing: 3px; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">SMOODI</h3>
            <p style="margin: 0 0 20px 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 400; max-width: 300px; margin-left: auto; margin-right: auto;">
              Your trusted partner in business solutions
            </p>
            <div style="display: flex; justify-content: center; gap: 24px; margin-top: 24px; flex-wrap: wrap;">
              <a href="#" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 25px; transition: all 0.3s ease;">
                <span>📧</span> Support
              </a>
              <a href="#" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 25px; transition: all 0.3s ease;">
                <span>🌐</span> Website
              </a>
              <a href="#" style="color: rgba(255,255,255,0.9); text-decoration: none; font-size: 15px; font-weight: 500; display: flex; align-items: center; gap: 8px; padding: 8px 16px; background: rgba(255,255,255,0.1); border-radius: 25px; transition: all 0.3s ease;">
                <span>📱</span> Mobile App
              </a>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.2);">
              <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 300;">
                © 2025 Smoodi. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      </style>
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
