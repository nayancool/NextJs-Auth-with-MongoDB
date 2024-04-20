import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs';
import User from '@/models/userModel';
import { set } from 'mongoose';

export const sendEmail = async({email, emailType, userId} : any)  =>
    {
        try{

            // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set:
                {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000}
            })
        } else if (emailType === "RESET"){
            await User.findByIdAndUpdate(userId, {
                $set:{
                    forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }

            
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "c47392135dbb1b",
              pass: "5e30365d40bd31"
            }
          });

            const mailOption = {
                from: 'nayan6@gmail.com', // sender address
                to: email,
                subject: emailType === 'VERIFY'? "Verify your email": "Reset your password",
                email: "Reset your password", // plain text body
                html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
            }
            
            const mailResponse = await transport.sendMail(mailOption)

            return mailResponse
        }
        catch(error: any)
        {
            throw new Error(error.message)
        }
    }