'use client'
import React from "react";
import Link from 'next/link';
import { useState } from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isWait, setIsWait] = useState(false);
    const [message, setMessage] = useState("");


    const handleLogin = () => {
      setIsWait(true)
      setMessage('')
      fetch("http://192.168.1.111:8000/users/api/login/",{
        method:'post',
        headers: {
        'Content-Type': 'application/json',
        },
        body:JSON.stringify({
        email:email,
        password:password,

        })
        
      },)
      .then(response =>{
          setIsWait(false)
          if (response.status===200 || response.status===400){
              
              return response.json()
          }else{
              setMessage("server error 500")
              return 'server error 500'
          }
      })
      .then(data =>{
          if (data === 'server error 500' || data ==='account not active' || data ==='false data' || data ==='email not regested'){
            setMessage(data)
          }else {
            localStorage.setItem('token',JSON.stringify(data))
            window.location.href='/'
          }
      })}
      
    let token = localStorage.getItem('token')

    if (token){
      window.location.href="/"
    }else{
          return(
          <div className="text-center rounded bg-white  border border-blue-900 m-3 p-4">
                      <h1 className="mb-4 text-blue-500 text-2xl font-bold">Sign In</h1>
                    
                      <div className="text-red-900 h-7">{message}</div>
                  
                      <div className="m-3">
                      
                        <label className="">Email</label><br></br>
                        <input type="email" className="h-8 rounded border-blue-700 border" onChange={(e) => setEmail(e.target.value)} />
                        


                      </div>
                      <div className="m-3">
                        <label className="">Password</label> <br></br>
                        <input type="password" className="h-8 rounded border-blue-700 border" onChange={(e) => setPassword(e.target.value)} />
                        
                      </div>
                
                      <div className="text-center">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={handleLogin}>
                            Sign In
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" onClick={handleLogin}>
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                      </div>
                    
                      <div className="mt-3 text-blue-700 text-center" >
                        <Link href="/reset_password" className="text-decoration-none">Forgot password?</Link>
                      </div>
                      <div className="mt-3 text-blue-700 text-center" >
                        <Link href="/register" className="text-decoration-none">create account</Link>
                      </div>
          </div>
    )}
}
  

export default Login