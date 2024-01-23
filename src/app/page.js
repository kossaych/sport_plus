'use client'
import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
import Courses from "@/components/Home components/courses"; 
import HomeLogedIn from "@/components/Home components/home_loged_in";  
import { useEffect, useState } from "react";
 export default function Home() { 
  
  if (typeof window !== "undefined") {
    
          if (localStorage.getItem('token') ) {  
          return ( 
            <HomeLogedIn></HomeLogedIn>
            
           
          )}else{
            return ( 
            <>
              you are not loged in
            </>
            )
          }
  }
 

}
