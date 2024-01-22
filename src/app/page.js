'use client'
import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
import Courses from "@/components/Home components/courses";

import { useEffect, useState } from "react";
 export default function Home() { 




  const [user,setUser] = useState({})
      
  useEffect(()=>{

    fetch("http://192.168.1.111:8000/content/api/profile/", {
      method: "get",
      headers: {
        'Authorization': 'token ' + "9a6c94ca1af10d19649d6c6b99c0d6b5baf7e504",
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

    if (typeof window !== "undefined") {
    
          if (localStorage.getItem('token') ) {  

 
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
 

}
