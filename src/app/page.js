'use client' 
import HomeLogedIn from "@/components/Home components/home_loged_in";   
export default function Home() { 
  
  if (typeof window !== "undefined") { 
        if (true ) {  
            return ( 
                  <HomeLogedIn></HomeLogedIn> 
              )
        }
        else{
            return ( 
                <>
                  you are not loged in
                </>
            )
        }
  }
 

}
