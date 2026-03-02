import nodemailer, { TransportOptions } from 'nodemailer';

const sendEmail = async (options: { email: string; subject: string; message: string }) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    } as TransportOptions);

    const mailOpts = {
        from: `E-shop App <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOpts);
};

export default sendEmail;
