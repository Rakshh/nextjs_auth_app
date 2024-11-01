
import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest){
    //implement try catch
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log("body " +reqBody);

        //check if user doesn't exist
        const user = await User.findOne({email})
        console.log("user present" +user)
        if(!user){
            return NextResponse.json({error: 'User does not exist'},
            {status: 400})
        }
        // check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        console.log("validPass" +validPassword);
        
        if(!validPassword){
            return NextResponse.json({error: 'Invalid Password'},
            {status: 400})
        }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }


        //create token using jwt
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"})
        console.log('token' +token);
        
        const response = NextResponse.json({message: "login successful", status:200})
        console.log('response ' +response.body);
        response.cookies.set("token",token, {
            httpOnly: true,
            path: "/"
        })
        return response
        
    } catch (error:any) {
        return NextResponse.json( {error: error.message},
            {status: 500})
        
    }
}