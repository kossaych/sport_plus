'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
  
export default function Profile() {
    const [user,setUser] = useState({
        lastName : "",
        bio : "" ,
        firstName:'',
        level : {title  : ""} ,
        descepline : {title  : ""},
        email : '',
        phone : '',
        address : '',
        imgCoverUrl:'',
        imgProfileUrl:'',
        role : ''

    })   
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [message, setMessage] = useState("");
    const openPopUp = () => {
        setPopUpOpen(true);
    }
    const closePopUp = () => {
        setPopUpOpen(false);
    } 
    
    const [isWaitLoading, setIsWaitLoading] = useState(true);

    useEffect(()=>{ 
        fetch("http://192.168.1.111:8000/content/api/profile/", {
            method: "get",
            headers: {
                'Authorization': 'token ' + JSON.parse( localStorage.getItem('token')),
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

    },[]) 

    return ( 
        <>
            {isWaitLoading == true ? <div className='absolute bg-black h-full z-40 w-full object-cover object-center opacity-20   '>
               
            </div> : ""} 
                <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto my-4 bg-white shadow-xl rounded-lg text-gray-900">
                 
                 
                    <div className="rounded-t-lg w-full h-32 flex justify-end">  
                        {isWaitLoading == false ? <img className="w-full object-cover object-center"src={"http://192.168.1.111:8000/media/" + user.imgCoverUrl} alt = 'cover image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>}
                            
                    </div> 
                        
                    <div className="mx-auto  h-32 w-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden flex justify-end items-end ">
                        
                    {isWaitLoading == false ?  <img className="object-cover object-center h-32 w-full" src= {"http://192.168.1.111:8000/media/" + user.imgProfileUrl} alt = 'profile image'/> : <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto"></div>}
                    </div>  


                    <div className="text-center grid grid-cols-1 mt-2">
                            <h2 className="font-semibold text-blue-500 ">{user.lastName + " " + user.firstName}</h2>


                            { user.role == 'student' ? <span className="text-gray-500">{user.level.title}</span> : <span className="text-gray-500">{user.descepline.title}</span>}

                            



                            <span className="text-gray-500">{user.bio}</span>   
                            <hr className="m-2"></hr>
                            <span className="text-gray-500">{user.email}</span> 
                            <span className="text-gray-500">{user.phone}</span>  
                            <span className="text-gray-500">address : {user.address}</span> 
                    </div> 

                    <div className="pb-4  pt-2  flex justify-between mx-2">
                         <Link  href='/edit_profile' className="rounded-xl bg-gray-600  p-2 mx-1 text-white text-center flex items-center">edit profile </Link >
                         <Link  href='/change_password' className="rounded-xl bg-gray-600  p-2 mx-1 text-white text-center flex items-center">change password  </Link >
                    </div>
                </div>
        </>
    )
}