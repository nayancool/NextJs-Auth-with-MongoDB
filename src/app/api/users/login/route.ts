import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({
                message: "User doesn't exists!☠️",
                status: 400
            })
        }
        console.log("User exists");
        //if user exists then comapre user password with saved password from db
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({ message: "password is incorrect!, Plz enter a valid password.🥺" })
        }
        // if user password is correct then create JWT token, install jwt

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const response = NextResponse.json({
            message: "Logged in succesfully",
            status: 200
        })
        //I want to send cookies also, as response type is NextResponse i can directly send.
        response.cookies.set("token", token, {
            httpOnly: true //setting  httpOnly:true bcz from this user from brower can manipulate the data
        })
        return response
    }
    catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}