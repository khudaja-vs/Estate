import nodemailer from 'nodemailer';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const sendContactMessage = async (req, res, next) => {
  const { recipientEmail, recipientName, listingName, message, senderEmail } = req.body;

  if (!recipientEmail || !emailPattern.test(recipientEmail)) {
    return res.status(400).json({ success: false, message: 'A valid recipient email is required.' });
  }

  if (!message?.trim()) {
    return res.status(400).json({ success: false, message: 'Message cannot be empty.' });
  }

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return res.status(500).json({ success: false, message: 'Email service is not configured.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Estate contact form <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: senderEmail && emailPattern.test(senderEmail) ? senderEmail : undefined,
      subject: `Regarding ${listingName || 'your listing'}`,
      text: `${message.trim()}\n\nSent through Estate${recipientName ? ` by ${recipientName}` : ''}.`,
    });

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    return next(error);
  }
};