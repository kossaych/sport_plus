'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'



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
    "discipline": "" ,
    'role' :'teacher'
  });

  const [disciplines, setDisciplines] = useState([]);
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
    fetch("https://educa-back.vercel.app/content/api/get_disciplines/", {
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
          setDisciplines(Array(data)[0])
          
        }
      });
    fetch("https://educa-back.vercel.app/content/api/get_addreses/", {
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
  });},[])

  const handleRegistration = () => {
    setIsWait(true);
    fetch("https://educa-back.vercel.app/content/api/register/", {
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
    fetch("https://educa-back.vercel.app/content/api/activate/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        code: user.code,
      }),
    }) 
    .then(response =>{
        setIsWait(false)
        if (response.status===200 || response.status===400){ 
            return {"data" : response.json(),"status" : response.status}
        }else{
            setMessage("server error 500") 
            return {"data" : "server error 500","status" : 500}
        }
    })
    .then(data =>{
        if (data.status != 200 ){
          setMessage(data.data)
          setPopUpOpen(true)
        }else {
          data.data.then(function(result) {
            localStorage.setItem('token',JSON.stringify(result))
            window.location.href='/' 
          });
          
        }
    }) 
  };
 
  return (

    <div className="text-center rounded bg-white  border border-blue-400  my-3 p-1 mx-3 ">
              {!isRegistered ? (
                <>
                          <h3 className="text-blue-500 text-2xl font-bold">Sign Up</h3>
                      
                          <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                                <h2 className="text-red-500 w-72">{message}</h2>       
                          </PopUp>
                          <div className="grid grid-cols-2">
                                  <input className={inputStyle}  type="text"   placeholder="First Name"   onChange = {(e) => setUser({ ...user, ['firstName']: e.target.value }) } />  
                                  <input className={inputStyle}  type="text"   placeholder="Last Name" onChange = {(e) => setUser({ ...user, ['lastName']: e.target.value }) }  /> 
                                
                          </div>
                          <div className="grid grid-cols-1 ">                     
                                        <input className={inputStyle}  type="email"   placeholder="Email" onChange = {(e) => setUser({ ...user, ['email']: e.target.value }) }  />  
                                        <input className={inputStyle}  type="number"   placeholder="Phone" onChange = {(e) => setUser({ ...user, ['phone']: e.target.value }) }  /> 
                                        <input className={inputStyle}  type="password"   placeholder="Password" onChange = {(e) => setUser({ ...user, ['password1']: e.target.value }) }  />

                                        <select  className={inputStyle}    id='discipline'    value={user.discipline}     onChange = {(e) => setUser({ ...user, ['discipline']: e.target.value }) }   >
                                                <option>chose division</option>
                                                {disciplines.map(o => (
                                                    <option key={o.id} value={o.id}>{o.title}</option>
                                                ))}    
                                        </select>
                                        <select   className={inputStyle} id='address'  onChange = {(e) => setUser({ ...user, ['address']: e.target.value }) }    >
                                                <option >chose an address </option>
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
                                          Register
                                      </button>
                                    ) : (
                                      <button disabled className="rounded border   bg-gray-600 text-white p-1" >
                                        <div className="max-h-10">
                                            <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                                        </div>
                                      </button>
                                    )} 
                          </div>                               
                          <hr   className="w-1/3 h-0.5 bg-gray-600 inline-block"></hr>  or <hr   className=" h-0.5 w-1/3 bg-gray-600 inline-block "></hr>
                          
                          <div className="mt-3 text-blue-600 visited:text-purple-800">
                            <Link href="/login" className="text-decoration-none">Login</Link>
                          </div>
                </>
              ) : (
              <>
                    <h3 className="mb-2 "> Please confirm your email address to complete the registration !</h3>
 
                    <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                            <h2 className="text-red-500 w-72">{message}</h2>       
                    </PopUp>

                    <input className={inputStyle}  placeholder="code de verifacation" onChange = {(e) => setUser({ ...user, ['code']: e.target.value })} /> 
  
                     <div className = {btnDiv}>
                        {isWait === false ? (
                          <button className={activeBtn}   onClick={handleVerification}>
                            Verification
                          </button>
                        ) : (
                          <button disabled   >
                            <div className = {inactiveBtn} >
                              <div  className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin m-auto"></div>
                            </div>
                          </button>
                        )}
                    
                    </div> 
              </>
              )}
    </div>

  );




}

export default Register;

