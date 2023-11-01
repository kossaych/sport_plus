'use client'

import React, { useState } from "react";
import Link from 'next/link';

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [user,setUser] = useState(
    {
        'first-name':"",
        'last-name' :'',
        'email' : '',
        'password1':'',
        'password2':'',
    }
);

 
  const [isWait, setIsWait] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/register/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password1: password1,
        password2: password2,
      }),
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
          setPassword1("");
          setPassword2("");
          setIsRegistered(true);
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return "server error 500";
        }
      })
      .then((data) => {
        if (!isRegistered && data) {
          setMessage(data);
        }
      });
  };

  const handleVerification = () => {
    setIsWait(false);
    fetch("http://localhost:8000/accounts/api/activate/", {
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
        setIsWait(true);
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return "server error 500";
        }
      })
      .then((data) => {
        if (
          data === "code not sent for your email" ||
          data === "user not registered" ||
          data === "invalid code time" ||
          data === "False code" ||
          data === "server error 500"
        ) {
          setMessage(data);
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "/";
        }
      });
  };


  return (

    <div className="text-center rounded bg-white  border border-blue-900 m-3 p-2">
              {!isRegistered ? (
                <>
                  <h3 className="text-blue-500 text-2xl font-bold">Sign Up</h3>
                  <div className="text-red-900 h-7">{message}</div>
                
                
                    <input type="text" className=" mb-2 border border-blue-800 rounded p-1" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
               
                  
                    <input type="text" className="  mb-2 border border-blue-800 rounded p-1" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
                  
                  
                    <input type="email" className="  mb-2 border border-blue-800 rounded p-1" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  
                  
                    <input type="password" className="  mb-2 border border-blue-800 rounded p-1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} />
                  
                  
                    <input type="password" className="  mb-2 border border-blue-800 rounded p-1" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)} />
                  
    
           
           
           
                  
                    <div className="text-center">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={handleRegistration}>
                            Sign In
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
                            <div className="max-h-10">
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                      </div>
                  <div className="mt-3">
                    <Link href="/login" className="text-decoration-none">Login</Link>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="mb-4">Please confirm your email address to complete the registration</h3>
                  <div className="alert alert-success">Registration Successful!</div>
                  <div className="form-group mb-3">
                    <input type="text" className="form-control bg-light" placeholder="Code Verification" maxLength="8" onChange={(e) => setCode(e.target.value)} />
                  </div>
                  <div className="d-grid">
                    {isWait ? (
                      <button className="btn btn-primary" onClick={handleVerification}>
                        Verify Code
                      </button>
                    ) : (
                      <button className="btn btn-primary" disabled>
                        <div className="spinner-border text-primary" role="status">
                          <span className="sr-only"></span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="mt-3">
                    <Link to="/login" className="text-decoration-none">Login</Link>
                  </div>
                </>
              )}
    </div>

  );




}

export default Register;

