import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody);
        const {username, email, password} = reqBody
        const userAlreadyPresent = await User.findOne({email})
        if(userAlreadyPresent){
            return NextResponse.json({error: 'User Already Present'},
                {status: 400})
        }

        //hash password

        const salt = await bcryptjs.genSalt(10)
        const hashedpassword= await bcryptjs.hash(password,salt)

        //create new user

        const newUser=new User({
            username,
            email,
            password: hashedpassword
        })

        const savedUser = await newUser.save()
        console.log("User saved in DB" +savedUser);

        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            savedUser},
        )

    } catch (error:any) {
        console.log("Error:" +error);
        return NextResponse.json({error: error.message},
            {status: 500})
        
    }
}