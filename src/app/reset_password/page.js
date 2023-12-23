'use client'

import React, { useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'

function ResetPassword() {
  const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
  const btnDiv  = "text-center grid grid-cols-1 place-items-center"
  const activeBtn = "border rounded-md h-10 bg-blue-600 p-1 text-white w-1/2"
  const inactiveBtn = "rounded-md border h-10 bg-gray-600 p-1 text-white "
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(""); 

  const [emailPage, setEmailPage] = useState(true);
  const [codePage, setCodePage] = useState(false);
  const [passwordPage, setPasswordPage] = useState(false);

  const [isWait, setIsWait] = useState(false);
  const [message, setMessage] = useState("");
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
        setIsWait(false);
        if (response.status == 500) {
            return 'server error'
          } else {
            return response.json()
          }
      })
      .then((data) => {
        if (data === 'check your email'){
          setEmailPage(false);
          setIsWait(false);
          setCodePage(true);
        }else{
            setMessage(data)
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
        if ( data === "invalid new password" ||  data === "invalid code time" ||  data === "False code" || data === "code not sent to your email" || data === "user not found" || data === "server error 500") {
          setMessage(data)
          setPopUpOpen(true)
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "/";
        }
      });
  };

  return (
      <div className="text-center rounded bg-white  border border-blue-600 m-3 p-2">
            <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                       <h2 className="text-red-500 w-72">{message}</h2>       
            </PopUp>
           
            {emailPage ? <div className=""> 
                <h3 className="mb-4">Enter Your Email</h3> 
                <input className = {inputStyle} type="email"  placeholder="Email address" onChange={(e) => setEmail(e.target.value)}/>
                <br></br>
                <Link href="/login" className="text-blue-500 my-2 inline-block">
                    Login with my password
                </Link>
                <br /> 
                <div className={btnDiv}>
                        {isWait === false ? (
                          <button className={activeBtn} onClick={sendEmail}>
                             Send email
                          </button>
                        ) : (
                          <button disabled className={inactiveBtn}  >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                </div>
            </div> : null}

            {codePage?<div >
   
                  <h3 className="mb-4">we have send you a code Please Confirm Your Email Address</h3>
                
                  <input className = {inputStyle} type="text"   placeholder="Code de verification" maxLength="8" onChange={(e) => setCode(e.target.value)} />


                  <div className={btnDiv}>
                        {isWait === false ? (
                          <button className={activeBtn} onClick={sendVerificationCode}>
                             Send Code
                          </button>
                        ) : (
                          <button disabled className={inactiveBtn}  >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                  </div>
                 
                
            </div> : null}

            {passwordPage?<div >
                <h3 className="mb-4">Set New Password</h3> 
                <input className = {inputStyle} type="password"   placeholder="password" onChange={(e) => setPassword(e.target.value)} />      
                <input className = {inputStyle} type="password" placeholder="Confirm password"   />
                <div className={btnDiv}>
                        {isWait === false ? (
                          <button className={activeBtn} onClick={sendPassword}>
                             Change password
                          </button>
                        ) : (
                          <button disabled className={inactiveBtn}  >
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
