'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'
import { CiEdit } from "react-icons/ci";



function Register() {
  const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
  const btnDiv  = "text-center grid grid-cols-1 place-items-center"
  const activeBtn = "border rounded-md h-10 bg-blue-600 p-1 text-white w-1/2"
  const inactiveBtn = "rounded-md border h-10 bg-gray-600 p-1 text-white "
  
  const [user, setUser] = useState({ 
    "firstName" : "",
    "lastName" : "",
    "password1" : "",
    "email" : "",
    "password2" : "", 
    "code" : "",
    "phone" : "",
    "address" : "",
    "sex" : "",
    "level": "" 
  });

   const [addreses, setAddreses] = useState([]); 

  const [isWait, setIsWait] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  

  const openPopUp = () => {
    setPopUpOpen(true);
  }
  const closePopUp = () => {
    setPopUpOpen(false);
  }
 
  
  useEffect(()=>{
     fetch("http://192.168.1.111:8000/users/api/get_addreses/", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
       
      })
    .then((response) => {
          
          if (response.status === 200) {
            return response.json();
          } else {
            setPopUpOpen(true)
            setMessage('server error try again !');
          }
        })
    .then((data) => {
          if (data) {
            setAddreses(Array(data)[0])
            
          }
        });

  },[])


  const handleRegistration = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/register_student/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
         
          setIsRegistered(true);
        } else if (response.status === 400) {
          return response.json();
        } else if (response.status === 500) {
          return "server error 500";
        }
      })
      .then((data) => {
        if (!isRegistered && data) {
          setPopUpOpen(true)
          setMessage(data);
        }
      });
  };

  const handleVerification = () => {
    setIsWait(true);
    fetch("http://192.168.1.111:8000/users/api/activate/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        code: user.code,
      }),
    })
      .then((response) => {
        setIsWait(false);
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
          data === 'code time'||
          data === 'invalid code'||
          data === 'code not sended to your email'||
          data === "user not registed" ||
          data === "server error 500"
        ) {
          setPopUpOpen(true)
          setMessage(data);
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          window.location.href = "/";
        }  
      });
  };
 
  return (

    <div className="text-center rounded bg-white  border border-blue-400  my-3 p-1 mx-3 "> 
    
                            <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                                    <h2 className="text-red-500 w-72">{message}</h2>       
                            </PopUp> 

                            <div className="rounded-t-lg h-32 flex justify-end"> 
                                <img className="w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' />
                                <label className="absolute bg-gray-600 text-white rounded-full p-1 m-2" > 
                                        <CiEdit size={24} /> 
                                        <input type="file" id="fileInput"  accept="image/*" className="hidden"  onChange={(e) => handleFileUpload(e.target.files[0])} />
                                </label> 
                            </div> 
                            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden flex justify-end items-end ">
 
                                <img className="object-cover object-center h-32" src='https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Woman looking front' />
                                <label className="absolute bg-gray-600 text-white rounded-full p-1 m-3" > 
                                        <CiEdit size={24} /> 
                                        <input type="file" id="fileInput"  accept="image/*" className="hidden"  onChange={(e) => handleFileUpload(e.target.files[0])} />
                                </label> 
                            
                            </div> 

                            <h3 className="text-blue-500 text-2xl font-bold">edit profile</h3>

                            <div className="grid grid-cols-2">
                                    <input className={inputStyle}  type="text"   placeholder="First Name"   onChange = {(e) => setUser({ ...user, ['firstName']: e.target.value }) } />  
                                    <input className={inputStyle}  type="text"   placeholder="Last Name" onChange = {(e) => setUser({ ...user, ['lastName']: e.target.value }) }  /> 
                                    
                            </div>

                            <div className="grid grid-cols-1 ">                     
                                            <input className={inputStyle}  type="email"   placeholder="Email" onChange = {(e) => setUser({ ...user, ['email']: e.target.value }) }  />  
                                            <input className={inputStyle}  type="number"   placeholder="Phone" onChange = {(e) => setUser({ ...user, ['phone']: e.target.value }) }  /> 
                                            <input className={inputStyle}  type="password"   placeholder="Password" onChange = {(e) => setUser({ ...user, ['password1']: e.target.value }) }  />

                                            
                                            <select   className={inputStyle} id='address'  onChange = {(e) => setUser({ ...user, ['address']: e.target.value }) }    >
                                                    <option key={-1} value={null}  ><span className="" >chose an address</span></option>
                                                    {addreses.map(o => (
                                                        <option key={o.id} value={o.address}>{o.address}</option>
                                                    ))}    
                                            </select>
                                            <div    className={inputStyle} >
                                                <span className="text-left " style={{ display : 'inline-block',width:'21.5%'}}>sex :</span>  
                                                <span className="ml-2">homme</span>  
                                                <input className={inputStyle}  type="radio"  name="sex" value='male'  onChange = {(e) => setUser({ ...user, ['sex']: e.target.value }) }  /> 
                                                <span className="ml-2">femme</span>
                                                <input className={inputStyle}   type="radio"    name="sex" value="female" onChange = {(e) => setUser({ ...user, ['sex']: e.target.value }) }   />
                                            </div>
                            </div> 

                            <div className="text-center grid grid-cols-1 place-items-center">
                                        {isWait === false ? (
                                        <button className="border rounded-md h-10   bg-blue-600 p-1 text-white w-1/2" onClick={handleRegistration}>
                                            Edit
                                        </button>
                                        ) : (
                                        <button disabled className="rounded border   bg-gray-600 text-white p-1" >
                                            <div className="max-h-10">
                                                <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                                            </div>
                                        </button>
                                        )} 
                            </div>   

                            <div className="mt-3 text-red-600 ">
                                <Link href="/login" className="text-decoration-none">cancel</Link>
                            </div>
           
               
    </div>

  );




}

export default Register;
