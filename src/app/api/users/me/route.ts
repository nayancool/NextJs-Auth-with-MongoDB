import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { GetDataFromToken } from "@/Helper/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    //extract data from token
    const userId = await GetDataFromToken(request) // added await here bcz i don't want to proceed until and unless i get my data

    //get data from db
    const user = await User.findOne({ _id: userId }).select("-password") //.select("-password") from this I will not get password in user.

    //check if there is no user
    if (!user) {
        return NextResponse.json({
            message: "User ka data nhi hai.🥺☠️",
            data: user
        })
    }

    return NextResponse.json({
        message: "User found😀",
        data: user
    })
}