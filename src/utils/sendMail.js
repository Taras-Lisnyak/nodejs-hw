import nodemailer from 'nodemailer';

const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT
    ? parseInt(process.env.SMTP_PORT, 10)
    : undefined;
  const smtpSecure = process.env.SMTP_SECURE === 'true';

  if (!smtpHost || !smtpPort) {
    throw new Error(
      'SMTP_HOST and SMTP_PORT must be set in environment variables to send email.',
    );
  }

  const smtpAuth =
    process.env.SMTP_USER && process.env.SMTP_PASSWORD
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      : undefined;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: smtpAuth,
  });

  transporter.verify((error) => {
    if (error) {
      console.error('SMTP transporter verification failed:', error);
    } else {
      console.log('SMTP transporter is ready to send emails');
    }
  });

  return transporter;
};

export const sendEmail = async (options) => {
  const transporter = createTransporter();

  try {
    return await transporter.sendMail(options);
  } catch (error) {
    console.error('sendEmail failed:', error);
    throw error;
  }
};
