import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()


export async function POST(request: NextResponse) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token);

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json({ error: "Invalid token, Plz try again with new token.😒" },
                { status: 400 }
            )
        }

        console.log(user);

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Reset email verified succesfully!🙏",
            success: true
        }, { status: 200 }
        )
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message },
            { status: 500 }
        )
    }
}