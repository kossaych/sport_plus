'use client'

import React, { useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'

function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [isWait, setIsWait] = useState(false);
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [message, setMessage] = useState("");

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
          window.location.href = "/";
        } else {
        setPopUpOpen(true)
        setMessage(data);
        }
      });
  }
  
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const openPopUp = () => {
    setPopUpOpen(true);
  }

  const closePopUp = () => {
    setPopUpOpen(false);
  }
  
  return (
    <div className="text-center rounded bg-white  border border-blue-900 m-3 p-2">

                <h3 className="text-blue-500 text-2xl font-bold">Change password</h3>
                 
                 <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                       <h2 className="text-red-500 w-72">{message}</h2>       
                 </PopUp>

                <div className=" mb-4">
                  <input
                    type="password"
                    className=" mb-2 border   border-blue-800 rounded p-1"
                    placeholder="Old password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div className=" mb-4">
                  <input
                    type="password"
                    className=" mb-2 border   border-blue-800 rounded p-1"
                    placeholder="new password"
                    onChange={(e) => setNewPassword1(e.target.value)}
                  />
                </div>
                <div className=" mb-4">
                  <input type="password" className=" mb-2 border   border-blue-800 rounded p-1" placeholder="Confirm password" onChange={(e) => setNewPassword2(e.target.value)}/>
                </div>
                <Link href="/" className="text-red-500 ">
                    Cancel
                </Link>
           
             
             
                <div className="text-center mt-4">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={sendData}>
                             Change 
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
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
