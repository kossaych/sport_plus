'use client'
import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
import Courses from "@/components/Home components/courses";

import { useEffect, useState } from "react";
 export default function Home() {
  
  if (typeof localStorage !== 'undefined') {
    const token  =  localStorage.getItem('token')  
  }  else{
    const token = ''
  }

    




    const [user,setUser] = useState({})
      
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
          }  
        }) 
        .then((data) => { 
             if (data) {
                setUser(data)
            }
        }) 
    },[])
    
    if (token != '') { 
     return ( 
      
      <div classNameName="bg-white"> 
    
        <Lives ></Lives>
        {user.role == 'student'  ?  <Subjects></Subjects>  : "" }
        {user.role == 'teacher'  ?  <Courses></Courses> : "" }
 
      </div>
    
   
    )}else{
      return ( 
      <>
        you are not loged in
      </>
      )
    }
 

}
