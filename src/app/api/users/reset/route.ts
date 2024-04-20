import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/Helper/mailer";
import { error } from "console";
import { use } from "react";


connect()


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        //check if email exist or not

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: "User doesn't exists.🤷‍♂️"
            })
        }
    console.log("nayan "+user);

        //send mail for reset.
        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: " Reset mail sent succesfully!",
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 400
        })
    }
}