'use client'
import React from "react";
import Link from 'next/link';
import { useState } from "react";
import PopUp from '/src/components/general/pop-up.js'

function Login(){
    const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
    const btnDiv  = "text-center grid grid-cols-1 place-items-center"
    const activeBtn = "border rounded-md h-10 bg-blue-600 p-1 text-white w-1/2"
    const inactiveBtn = "rounded-md border h-10 bg-gray-600 p-1 text-white " 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isWait, setIsWait] = useState(false);
    const [message, setMessage] = useState("");  
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const openPopUp = () => {
      setPopUpOpen(true);
    }
  
    const closePopUp = () => {
      setPopUpOpen(false);
    }
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
            setPopUpOpen(true)
          }else {
            localStorage.setItem('token',JSON.stringify(data))
            window.location.href='/'
          }
      })}

    return(
          <div className="text-center rounded bg-white  border border-blue-600 m-3 p-4">
                      <h1 className=" text-blue-500 text-2xl font-bold">Sign In</h1>
                    
                      <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                       <h2 className="text-red-500 w-72">{message}</h2>       
                      </PopUp>
                  
                      <div className="m-3">
                      
                        <label className="">Email</label><br></br>
                        <input className={inputStyle} type="email"   onChange={(e) => setEmail(e.target.value)} />
                        


                      </div>
                      <div className="m-3">
                        <label className="">Password</label> <br></br>
                        <input className={inputStyle} type="password"   onChange={(e) => setPassword(e.target.value)} />
                        
                      </div>
                
                      <div className={btnDiv}>
                        {isWait === false ? (
                          <button className={activeBtn} onClick={handleLogin}>
                            Sign In
                          </button>
                        ) : (
                          <button disabled className={inactiveBtn} >
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

  

export default Login