const nodemailer = require('nodemailer');
const pug = require('pug');
const path = require('path');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendEmail = async (book) => {
  const html = pug.renderFile(path.join(__dirname, '../views/bookCreated.pug'), {
    title: book.title,
    author: book.author,
    year: book.year,
  });

  const mailOptions = {
    from: `"Book API" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: 'New Book Created',
    html,
  };

  const info = await transporter.sendMail(mailOptions);

  
  console.log('Email sent:', info.messageId);
  console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;
