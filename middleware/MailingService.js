import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const SERVICE = process.env.MAIL_SERVICE;
const HOST = process.env.MAIL_HOST;
const PORT = process.env.MAIL_PORT;
const SECURE = true;
const USER = process.env.MAIL_USER;
const PASS = process.env.MAIL_PASS;

const mailConfig = {
    service: SERVICE,
    host: HOST,
    port: PORT,
    secure: SECURE,
    auth: {
        user: USER,
        pass: PASS
    }
}

const transporter = nodemailer.createTransport( mailConfig );

function mail(to, subject, text){
    let mailOptions = {
        from: mailConfig.user,
        to,
        subject,
        text
    }

    transporter.sendMail(mailOptions, (err, info)=>{
        if( err ) throw err;
        console.log("Email sent: ", info.response);
    });
}

export {
    mail
}