'use client'
import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
import Levels from "@/components/Home components/levels";

import { useEffect, useState } from "react";
 export default function Home() {
    const token = localStorage.getItem('token') 
    
    if (token != '') {
    const [user,setUser] = useState({})
      
    useEffect(()=>{
  
      fetch("http://192.168.1.111:8000/content/api/profile/", {
        method: "get",
        headers: {
          'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
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


     return ( 
      
      <div className="bg-blue-50"> 
    
        <Lives ></Lives>
        {user.role == 'student'  ?  <Subjects></Subjects>  : "" }
        {user.role == 'teacher'  ?  <Levels></Levels> : "" }
 
      </div>
    
   
    )}else{
      return ('you are loged out')
    }
 
  
   
}
