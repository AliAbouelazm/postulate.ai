import nodemailer from 'nodemailer';

// Create transporter - using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
    },
  });
};

// Send waitlist notification email
export const sendWaitlistNotification = async (
  email: string,
  name: string | null,
  type: 'CREATOR' | 'COMPANY',
  company: string | null,
  message: string | null
) => {
  try {
    const transporter = createTransporter();
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'trypostulate@gmail.com';

    const typeLabel = type === 'CREATOR' ? 'Creator' : 'Company';
    const companyInfo = company ? `\nCompany: ${company}` : '';
    const messageInfo = message ? `\nMessage: ${message}` : '';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipientEmail,
      subject: `New Waitlist Signup - ${typeLabel}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Type:</strong> ${typeLabel}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        ${companyInfo ? `<p>${companyInfo}</p>` : ''}
        ${messageInfo ? `<p>${messageInfo}</p>` : ''}
        <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
        New Waitlist Signup
        
        Type: ${typeLabel}
        Email: ${email}
        ${name ? `Name: ${name}` : ''}
        ${companyInfo}
        ${messageInfo}
        Signed up at: ${new Date().toLocaleString()}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Waitlist notification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending waitlist notification email:', error);
    // Don't throw error - we don't want email failures to break the signup
  }
};

// Send confirmation email to the user who signed up
export const sendConfirmationEmail = async (
  email: string,
  name: string | null,
  type: 'CREATOR' | 'COMPANY'
) => {
  try {
    const transporter = createTransporter();
    const typeLabel = type === 'CREATOR' ? 'Creator' : 'Company';

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to postulate.ai Waitlist!',
      html: `
        <h2>Thank you for joining the postulate.ai waitlist!</h2>
        <p>Hi ${name || 'there'},</p>
        <p>We're excited to have you join us as a ${typeLabel.toLowerCase()} on postulate.ai!</p>
        <p>We'll be in touch soon with updates and early access information.</p>
        <p>In the meantime, feel free to reach out if you have any questions.</p>
        <br>
        <p>Best regards,<br>The postulate.ai Team</p>
      `,
      text: `
        Thank you for joining the postulate.ai waitlist!
        
        Hi ${name || 'there'},
        
        We're excited to have you join us as a ${typeLabel.toLowerCase()} on postulate.ai!
        
        We'll be in touch soon with updates and early access information.
        
        In the meantime, feel free to reach out if you have any questions.
        
        Best regards,
        The postulate.ai Team
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error - we don't want email failures to break the signup
  }
};

