import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function GetDataFromToken(request: NextRequest) {
    try {
        //first try to get data from cookies
        const token = request.cookies.get("token")?.value || "";
        //decrypt data from token

        const decryptData: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        return decryptData.id;
    } catch (error: any) {
        return new Error(error.message)
    }
}