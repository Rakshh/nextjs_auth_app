"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { sign } from 'crypto'
import Link from 'next/link'
import { NextResponse } from 'next/server'

const LoginPage = () => {
    const router= useRouter()
    const [user,setUser] = React.useState({
        email:'',
        password:''
    })
 const [buttondisabled, setButtonDisabled] = React.useState(false); 
 
 useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
 },[user])
const onLogin= async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault() 
  console.log('inside login')
    try {
      await axios.post('/api/users/login', user)
      console.log('login success');
      router.push('/profile')
      
    } catch (error) {
      NextResponse.json({error: 'Login Failed',
      status: 500})
      
    }
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 space-y-6">
        <h1 className="text-2xl font-bold text-center text-black mb-6">Login</h1>
        
        <form className="space-y-4">
          
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={user.email}
              onChange={(e)=> setUser({...user, email:e.target.value})}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-blue-500 
                focus:border-blue-500 text-black"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e)=> setUser({...user, password:e.target.value})}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                focus:outline-none focus:ring-1 focus:ring-blue-500 
                focus:border-blue-500 text-black"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
          onClick={onLogin}
        
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md 
              hover:bg-blue-600 focus:outline-none focus:ring-2 
              focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Login
          </button>
          <Link className='text-black ' href="/signup"> Visit Signup Page</Link>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
