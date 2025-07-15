const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'niran@getsmoodi.com',
    pass: 'mdnmhmhyrvtnunzf' // App password
  }
});

// Dollar-based email template
function generateEmailTemplate(business_name, business_address, cart_items) {
  const itemsHTML = cart_items.map(item => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #ccc;">
        <strong>${item.title}</strong> (x${item.quantity}) - $${(item.price * item.quantity).toLocaleString("en-US")}
      </td>
    </tr>
  `).join('');

  const totalAmount = cart_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Checkout Notification</title>
    </head>
    <body style="font-family: Arial, sans-serif; padding: 20px; background: #f4f4f4; color: #333;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px #ddd;">
        <h2 style="color: #27ae60;">New Checkout Info Submission 🛒</h2>
        <p><strong>Business Name:</strong> ${business_name}</p>
        <p><strong>Address:</strong> ${business_address}</p>
        <hr />
        <h3>Items:</h3>
        <table width="100%" style="border-collapse: collapse;">
          ${itemsHTML}
        </table>
        <hr />
        <h3>Total: $${totalAmount.toLocaleString("en-US")}</h3>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          Additional Info: This is not an order confirmation. It’s a site notification that someone entered their details.
        </p>
      </div>
    </body>
    </html>
  `;
}

app.post('/submit-cart', (req, res) => {
  const { business_name, business_address, cart_items } = req.body;

  const htmlContent = generateEmailTemplate(business_name, business_address, cart_items);
  const totalAmount = cart_items.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const textContent = `
New Checkout Info Submission 🛒

Business Name: ${business_name}
Address: ${business_address}

Items:
${cart_items.map(i => `- ${i.title} (x${i.quantity}) - $${i.price}`).join('\n')}

Total: $${totalAmount.toLocaleString("en-US")}
`;

  const mailOptions = {
    from: 'niran@getsmoodi.com',
    to: 'niran@getsmoodi.com',
    subject: 'Smoodi: Additional information form was filled!',
    text: textContent,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('❌ Email failed:', err);
      return res.status(500).json({ success: false, message: 'Email failed' });
    }
    console.log('✅ Email sent:', info.messageId);
    return res.status(200).json({ success: true, message: 'Notification email sent' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
