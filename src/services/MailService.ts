import nodemailer from "nodemailer";

interface MailOptions {
    to: string,
    subject: string,
    text: string,
}

export = {
    sendMail: async (options: MailOptions) => {
        try {
            let transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });
            await transporter.sendMail({
                from: `Grocer Hut<${process.env.SMTP_USER}>`,
                ...options
            });
        } catch (err) {
        }
    }
}