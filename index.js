const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');
const upload = multer();
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/send', upload.none(), (req, res) => {
  const { name, email, visa, phone, message } = req.body;
  if (!name || !email || !visa || !phone || !message) return res.status(400).send('All fields are required.');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: 'noobsapiserver@gmail.com', pass: 'atcm njll pien xwln' },
  });

  const mailOptions = {
    from: email,
    to: 'fariasdipto@gmail.com',
    subject: `Visa Inquiry: ${visa}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #fff; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1);">
        <h2 style="border-bottom: 2px solid #007BFF; padding-bottom: 10px;">Visa Inquiry: <span style="color: #007BFF;">${visa}</span></h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF;">${email}</a></p>
        <p><strong>Visa Type:</strong> ${visa}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <div style="text-align: center; font-size: 12px; color: #888; margin-top: 20px;">Thank you for your inquiry. We will get back to you soon.</div>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
        console.log(error)
    return res.status(500).send('An error occurred while sending the email.');}
    res.send('OK');
  });
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));