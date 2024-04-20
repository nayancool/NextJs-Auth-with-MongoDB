import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


connect()

export async function GET(request: NextRequest) {
    //in logout we only want to reset the token
    try {
        const response = NextResponse.json(
            {
                message: "Sign out succesfully!. Bye have a great time",
                success: true
            }
        )
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return response

    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}