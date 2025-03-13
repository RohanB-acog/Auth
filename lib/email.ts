import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOTPEmail(email: string, otp: string) {
  // if (!email.endsWith('@aganitha.ai')) {
  //   throw new Error('Only @aganitha.ai email addresses are allowed');
  // }

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your Aganitha Login Code',
    text: `Your login code is: ${otp}. This code will expire in 10 minutes.`,
    html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://www.aganitha.ai/wp-content/uploads/2023/05/aganitha-logo.png" alt="Aganitha Logo" style="max-width: 200px;">
    </div>
    <h1 style="text-align: center; color: #333;">Your Login OTP</h1>
    <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px;">
      <p style="margin-bottom: 20px;">Your one-time password is:</p>
      <h2 style="font-size: 32px; letter-spacing: 5px; margin: 20px 0; color: #333;">${otp}</h2>
      <p style="color: #666;">This OTP will expire in 10 minutes.</p>
    </div>
  </div>
    `,
  });
}

