'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'
import { CiEdit } from "react-icons/ci";



function Register() {
    const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
 
    const [user,setUser] = useState({
        lastName : "",
        bio : "" ,
        firstName:'',
        level: {title  : ""},
        descepline : {title  : ""},
        email : '',
        phone : '',
        address : '',  
        imgCoverUrl:'',
        imgProfileUrl:''

    })   

    const [imgCover,setImgCover] = useState('')
    const [imgProfile,setImgProfile] = useState('')
    const [level,setLevel] = useState('')
    const [descepline,setDescepline] = useState('') 

    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [disciplines, setDisciplines] = useState([]);
    const [addreses, setAddreses] = useState([]); 
    const [isWait, setIsWait] = useState(false);
    const [isWaitLoading, setIsWaitLoading] = useState(true);
    const [levels, setLevels] = useState([]);
    


    const [imageCover, setImageCover] = useState("");
    const [imageProfile, setImageProfile] = useState("");
  
    const handleProfileImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImageProfile(selectedImage)
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImgProfile(reader.result);
          }
        };
        reader.readAsDataURL(selectedImage);
      }
    };
   
   
   
    const handleCoverImageChange = (e) => {
      const selectedImage = e.target.files[0];
      setImageCover(selectedImage) 
      if (selectedImage) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImgCover(reader.result);
          }
        };
        reader.readAsDataURL(selectedImage);
      }
    };

    

    const openPopUp = () => {
        setPopUpOpen(true);

    }
    const closePopUp = () => {
        setPopUpOpen(false);
    } 
 
    useEffect(()=>{
      
      fetch("http://192.168.1.111:8000/content/api/profile/", {
            method: "get",
            headers: {
                'Authorization': 'token ' + JSON.parse( 'localStorage.getItem('token')'),
                "Content-Type": "application/json",
            },
        
        })
            .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                setPopUpOpen(true)
                setMessage('server refrech the page !');
            }
            })
            .then((data) => {
            if (data) {
                setUser(Array(data)[0]) 
                setIsWaitLoading(false)
            }
        });
       
      fetch("http://192.168.1.111:8000/content/api/get_disciplines/", {
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


        fetch("http://192.168.1.111:8000/content/api/get_levels/", {
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
          setLevels(Array(data)[0])
          
        }
      });



      fetch("http://192.168.1.111:8000/content/api/get_addreses/", {
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
     
    const handleProfileEdit = () => {
      var editedUser = new FormData()
      editedUser.append('firstName', user.firstName) 
      editedUser.append('lastName', user.lastName) 

      editedUser.append('imgCover',imageCover) 
      editedUser.append('imgProfile',imageProfile)  

      editedUser.append('level',level)
      editedUser.append('descepline',descepline)

      editedUser.append('role', user.role)
      editedUser.append('email', user.email)
      editedUser.append('phone', user.phone)
      editedUser.append('address', user.address) 
      editedUser.append('sex', user.sex) 


      setIsWait(true);
      fetch("http://192.168.1.111:8000/content/api/profile/", {
        method: "post",
        headers: {
           'Authorization': 'token ' + JSON.parse( 'localStorage.getItem('token')'),

        },
        body: (editedUser),
      }) .then(response =>{
        setIsWait(false)
        if (response.status===200 || response.status===400){ 
            return {"data" : response.json(),"status" : response.status}
        }else{
            setMessage("server error 500")
            return 'server error 500'
        }
      }) .then(data =>{
            if (data.status != 200 ){
              setMessage(data.data)
              setPopUpOpen(true)
            }else {
              data.data.then(function(result) {
                localStorage.setItem('token',JSON.stringify(result))
               // window.location.href='/profile'
              })
            };
      })};
   


    return (
          <>
            {isWaitLoading == true ? <div class='absolute bg-black h-full z-40 w-full object-cover object-center opacity-20   '>
               
            </div> : ""} 
        
        <div className="text-center rounded bg-white  border border-blue-400  my-3 p-1 mx-3 "  > 
        
                                <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                                        <h2 className="text-red-500 w-72">{message}</h2>       
                                </PopUp> 
 

                                <div> 
                                  {imgCover ? (
                                      <> 
                                            <div className="rounded-t-lg h-32 flex justify-end">  
                                  
                                  
                                                {isWaitLoading == false ? <img className="w-full object-cover object-center" src={imgCover} alt = 'cover image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>}
                                
                                
                                                <label className="absolute bg-gray-600 text-white rounded-full p-1 m-2" > 
                                                        <CiEdit size={24} /> 
                                                        <input type="file" id="fileInput"  accept="image/*" className="hidden"  onChange={handleCoverImageChange} />
                                                </label>  
 
                                            </div>  
                                      </>
                                   
                                  ) : (
                                    <> 
                                    <div className="rounded-t-lg h-32 flex justify-end">  
                                  
                                  
                                  {isWaitLoading == false ? <img className="w-full object-cover object-center" src={"http://192.168.1.111:8000/media/" + user.imgCoverUrl} alt = 'cover image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>}
                  
                  
                                  <label className="absolute bg-gray-600 text-white rounded-full p-1 m-2" > 
                                          <CiEdit size={24} /> 
                                          <input type="file" id="fileInput"  accept="image/*" className="hidden"  onChange={handleCoverImageChange} />
                                  </label>  


                              </div> 
                                    </>
                                    
                                  )}
                                </div>

 
                
                                <label className="absolute bg-gray-600 text-white rounded-full p-1 m-7 z-10" > 
                                            <CiEdit size={24} /> 
                                            <input type="file" accept="image/*" onChange={handleProfileImageChange} className="hidden"    />
                                </label> 
                                <div> 
                                  {imgProfile ? (
                                      <>
                                            
                                            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden flex justify-end items-end ">
                                                  {isWaitLoading == false ?  <img className="object-cover object-center h-32  w-full"    src={imgProfile} alt = 'profile image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto"></div>}
                                            </div>  
                                      </>
                                   
                                  ) : (
                                    <>
                                            <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden flex justify-end items-end ">
                
                                              {isWaitLoading == false ?  <img className="object-cover object-center h-32  w-full" src= {"http://192.168.1.111:8000/media/" + user.imgProfileUrl} alt = 'profile image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto"></div>}
                                            </div>  
                                    
                                    </>
                                    
                                  )}
                                </div>


                                <h3 className="text-blue-500 text-2xl font-bold">edit profile</h3>

                                <div className="grid grid-cols-2">
                                        <input className={inputStyle} value={user.firstName}  type="text"   placeholder="First Name"   onChange = {(e) => setUser({ ...user, ['firstName']: e.target.value }) } />  
                                        <input className={inputStyle} value={user.lastName} type="text"   placeholder="Last Name" onChange = {(e) => setUser({ ...user, ['lastName']: e.target.value }) }  /> 
                                        
                                </div>

                                <div className="grid grid-cols-1 ">   
                                
                                                <select   className={inputStyle} id='address' value={user.address} onChange = {(e) => setUser({ ...user, ['address']: e.target.value }) }    >
                                                        <option   >chose an address </option>
                                                        {addreses.map(o => (
                                                            <option key={o.id} value={o.address}>{o.address}</option>
                                                        ))}    
                                                </select>

                                                
                                                {user.role == 'teacher' ? <select  className={inputStyle}  value={descepline}   id='discipline'  onChange = {(e) => setDescepline( e.target.value ) }   >
                                                <option className="hidden">{user.descepline.title}</option> 
                                                {disciplines.map(o => (
                                                      <option key={o.id} value={o.id}>{o.title}</option>
                                                  ))}    
                                                 </select> : <select  className={inputStyle} value={level} id='level' onChange = {(e) => {setLevel( e.target.value )}}  >
                                                   <option className="hidden">{user.level.title}</option>
                                                   {levels.map(o => (
                                                      <option key={o.id} value={o.id}>{o.level}</option>
                                                  ))}    
                                                 </select> }
                                                
                                                
                                                
                                                




                                                <div    className={inputStyle} >
                                                    <span className="text-left " style={{ display : 'inline-block',width:'21.5%'}}>sex :</span>  
                                                    <span className="ml-2">homme</span>  
                                                    <input className={inputStyle}  type="radio" checked={user.sex == 'male'}  name="sex" value='male'  onChange = {(e) => setUser({ ...user, ['sex']: e.target.value }) }  /> 
                                                    <span className="ml-2">femme</span>
                                                    <input className={inputStyle}   type="radio" checked={user.sex == 'female'} name="sex" value="female" onChange = {(e) => setUser({ ...user, ['sex']: e.target.value }) }   />
                                                </div>
                                </div> 

                                <div className="text-center grid grid-cols-1 place-items-center">
                                            {isWait === false ? (
                                            <button className="border rounded-md h-10   bg-blue-600 p-1 text-white w-1/2" onClick={handleProfileEdit}>
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
                                    <Link href="/profile" className="text-decoration-none">cancel</Link>
                                </div>
              
                  
        </div>
          </>

    ); 
 
}

export default Register;
