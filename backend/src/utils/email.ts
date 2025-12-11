import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistNotification = async (
  email: string,
  name: string | null,
  type: 'CREATOR' | 'COMPANY',
  company: string | null,
  message: string | null
) => {
  try {
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'trypostulate@gmail.com';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const typeLabel = type === 'CREATOR' ? 'Creator' : 'Company';
    const companyInfo = company ? `<p><strong>Company:</strong> ${company}</p>` : '';
    const messageInfo = message ? `<p><strong>Message:</strong> ${message}</p>` : '';

    await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      subject: `New Waitlist Signup - ${typeLabel}`,
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Type:</strong> ${typeLabel}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ''}
        ${companyInfo}
        ${messageInfo}
        <p><strong>Signed up at:</strong> ${new Date().toLocaleString()}</p>
      `,
    });
    console.log(`Waitlist notification email sent to ${recipientEmail}`);
  } catch (error) {
    console.error('Error sending waitlist notification email:', error);
  }
};

export const sendConfirmationEmail = async (
  email: string,
  name: string | null,
  type: 'CREATOR' | 'COMPANY'
) => {
  try {
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const typeLabel = type === 'CREATOR' ? 'Creator' : 'Company';

    await resend.emails.send({
      from: fromEmail,
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
    });
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
