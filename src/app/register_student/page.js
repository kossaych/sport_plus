'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'



function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password1, setPassword1] = useState("");
  const [email, setEmail] = useState("");
  const [password2, setPassword2] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [level, setLevel] = useState("");
  const [levels, setLevels] = useState([]);


  const [isPopUpOpen, setPopUpOpen] = useState(false);

  const openPopUp = () => {
    setPopUpOpen(true);
  }

  const closePopUp = () => {
    setPopUpOpen(false);
  }
 
  const [isWait, setIsWait] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(()=>{
    fetch("http://192.168.1.111:8000/users/api/get_levels/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
     
    })
      .then((response) => {
        setIsWait(false);
        if (response.status === 200) {
          return response.json();
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      })
      .then((data) => {
        if (data) {
          setLevels(Array(data)[0])
          
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
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password1: password1,
        password2: password2,
        phone:phone,
        city:city,
        level:level , 

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
        email: email,
        code:code,
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

    <div className="text-center rounded bg-white  border border-blue-900  my-3 p-2 w-3/6 mx-auto">
              {!isRegistered ? (
                <>
                    <h3 className="text-blue-500 text-2xl font-bold">Sign Up</h3>
                 
                    <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                          <h2 className="text-red-500 w-72">{message}</h2>       
                    </PopUp>
                    
  
                    <input type="text" className=" mb-2 border   border-blue-800 rounded bg-blue-100 p-1" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} /> <br></br>
               
                  
                    <input type="text" className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} /> <br></br>
                  
                  
                    <input type="email" className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /> <br></br>
                  
                  
                    <input type="password" className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="Password" onChange={(e) => setPassword1(e.target.value)} /> <br></br>
                  
                  
                    <input type="password" className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="Confirm Password" onChange={(e) => setPassword2(e.target.value)} /> <br></br>
                         
                    <input type="number" className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} /> <br></br>
                     
                  
                    <input  className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="city" onChange={(e) => setCity(e.target.value)} /> <br></br>
                    

                    <span className="text-left " style={{ display : 'inline-block',width:'21.5%'}}>sex :</span>
                    <br></br>

 
                    <input type="radio" className="  m-2 border border-blue-800 rounded bg-blue-100 p-1" name="sex"/>
                    <span className="mr-10">homme</span>  
                    <input type="radio" className="  m-2 border border-blue-800 rounded bg-blue-100 p-1" name="sex"/> 
                    <span className="mr-10">femme</span>
                    <br></br>

           
                    <select  className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1 " id='level' style={{ display : 'inline-block',width:'21.5%'}} value={level}  onChange={ e => setLevel(e.target.value)}  >
                             <option key={-1} value={-1}>chose division</option>
                            {levels.map(o => (
                                <option key={o.id} value={o.id}>{o.level}</option>
                            ))}    
                    </select>
  
                    <div className="text-center">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={handleRegistration}>
                            Register
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

                  <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                          <h2 className="text-red-500 w-72">{message}</h2>       
                    </PopUp>

                  <input  className="  mb-2 border border-blue-800 rounded bg-blue-100 p-1" placeholder="code de verifacation" onChange={(e) => setCode(e.target.value)} /> <br></br>



                     <div className="text-center">
                        {isWait === false ? (
                          <button className="rounded border h-10 border-blue-700 bg-blue-500 p-1 m-auto w-1/3" onClick={handleVerification}>
                            Verification
                          </button>
                        ) : (
                          <button disabled className="rounded border border-gray-700 bg-gray-500 p-1 m-auto w-1/3" >
                            <div className="max-h-10">
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

