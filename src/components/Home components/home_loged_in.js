'use client'
import Lives from "@/components/Home components/lives";
import Subjects from "@/components/Home components/subjects";
import Courses from "@/components/Home components/courses";

import { useEffect, useState } from "react";
function HomeLogedIn() { 

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
        
        <div classNameName="bg-white"> 
        
            <Lives ></Lives>
            {user.role == 'student'  ?  <Subjects></Subjects>  : "" }
            {user.role == 'teacher'  ?  <Courses></Courses> : "" }

        </div> 
    )
     
}
export default HomeLogedIn