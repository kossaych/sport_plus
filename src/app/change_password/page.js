'use client'

import React, { useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'

function ChangePassword() { 
  if(!(localStorage.getItem('token'))){
    window.location.href = "/";
  }
  const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
  const btnDiv  = "text-center grid grid-cols-1 place-items-center"
  const activeBtn = "border rounded-md h-10 bg-blue-600 p-1 text-white w-1/2"
  const inactiveBtn = "rounded-md border h-10 bg-gray-600 p-1 text-white "
  

  const [currentPassword, setCurrentPassword] = useState("");
  const [isWait, setIsWait] = useState(false);
  const [newPassword1, setNewPassword1] = useState("");
  const [message, setMessage] = useState("");
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const openPopUp = () => {
    setPopUpOpen(true);
  } 
  const closePopUp = () => {
    setPopUpOpen(false);
  }

  function sendData() {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/change_password/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
      },
      body: JSON.stringify({
        password: newPassword1,
        current_password: currentPassword,
      }),
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
          return true;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return "server error 500";
        }
      })
      .then((data) => {
        if (data === true) {
          window.location.href = "/profile";
        } else {
        setPopUpOpen(true)
        setMessage(data);
        }
      });
  }
  
  return ( 
    <div className="text-center rounded bg-white  border border-blue-400 m-3 p-2">

                  <h3 className="text-blue-500 text-2xl font-bold">Change password</h3> 
                  <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                        <h2 className="text-red-500 w-72">{message}</h2>       
                  </PopUp> 
                  <div className="">
                      <input className = {inputStyle} type="password" placeholder="Old password" onChange={(e) => setCurrentPassword(e.target.value)}/>
                      <input className = {inputStyle}  type="password" placeholder="new password" onChange={(e) => setNewPassword1(e.target.value)}/>
                   </div>
                  <div className={btnDiv}>
                          {isWait === false ? (
                            <>
                              <button className= {activeBtn} onClick={sendData}>
                                Change 
                              </button>
                              <Link href="/profile" className="text-red-500 ml-3">
                                Cancel
                              </Link> 
                            </>
                          ) : (
                            <button disabled className={inactiveBtn} >
                              <div className="max-h-10">
                                <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                              </div>
                            </button>
                          )}
                      
                  </div>
               


    </div> 
  );
}

export default ChangePassword;
