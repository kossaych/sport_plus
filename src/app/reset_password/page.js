'use client'

import React, { useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isWait, setIsWait] = useState(false);
  const [message, setMessageCode] = useState("");
  const [emailPage, setEmailPage] = useState(true);
  const [codePage, setCodePage] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);

    
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const openPopUp = () => {
    setPopUpOpen(true);
  }

  const closePopUp = () => {
    setPopUpOpen(false);
  }

  const sendEmail = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/reset_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => {
        setIsWait(true);
        return response.json()
      })
      .then((data) => {
        if (data === 'check your email') {
           setEmailPage(false);
           setIsWait(false);
           setCodePage(true);
        }else{
            setMessage(response.json())
            setPopUpOpen(true)
        }
      });
  };

  const sendVerificationCode = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/check_code/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
          return true;
        } else if (response.status === 400) {
          return response.json();
        }
      })
      .then((data) => {
        if (data === true) {
            setEmailPage(false)
            setCodePage(false)
            setPasswordPage(true)
          setIsWait(true);
        } else {
          setPopUpOpen(true)
          setMessage(data);
        }
      });
  };

  const sendPassword = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/set_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        code: code,
        password: password,
      }),
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else {
          return "server error 500";
        }
      })
      .then((data) => {
        if (
          data === "invalid new password" ||
          data === "invalid code time" ||
          data === "False code" ||
          data === "code not sent to your email" ||
          data === "user not found" ||
          data === "server error 500"
        ) {
          // Handle error messages here
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          setIsWait(true);
          window.location.href = "/";
        }
      });
  };

  
  return (
      <div className="text-center rounded bg-white  border border-blue-900 m-3 p-2">
            <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                       <h2 className="text-red-500 w-72">{message}</h2>       
            </PopUp>
            {emailPage ? <div className="">
        
             
                <h3 className="mb-4">Enter Your Email</h3>
                

                <input type="email" className=" mb-2 borderborder-blue-800 rounded p-1" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
   
                <Link href="/login" className="text-blue-500">
                    Login with my password
                </Link>
                <br />
                   
                <div className="text-center mt-4">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={sendEmail}>
                             Send email
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                </div>
            </div> : null}

            {codePage?<div >
   
                  <h3 className="mb-4">we have send you a code Please Confirm Your Email Address</h3>
                
                  <input type="text" className=" mb-2 border   border-blue-800 rounded p-1" placeholder="Code de verification" maxLength="8" onChange={(e) => setCode(e.target.value)} />


                  <div className="text-center mt-4">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={sendVerificationCode}>
                             Send Code
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                  </div>
                 
                
            </div> : null}

            {passwordPage?<div >
                <h3 className="mb-4">Set New Password</h3> 
                <input type="password" className=" mb-2 border   border-blue-800 rounded p-1" placeholder="password" onChange={(e) => setPassword(e.target.value)} />      
                <input type="password" placeholder="Confirm password" className=" mb-2 border   border-blue-800 rounded p-1"/>
                <div className="text-center mt-4">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={sendPassword}>
                             Change password
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                </div>
            </div> :null}
      </div>
    );
  
}

export default ResetPassword;
