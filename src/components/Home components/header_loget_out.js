import {CiBookmark ,CiLogin } from 'react-icons/ci'
import Link from 'next/link';
 
const HeaderLogedOut = () => {
 
return (
          <div className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between h-14  py-10 px-5 lg:px-8">
            
            
              <div className="">
                <Link href="/" >
                  
                  <img className="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
                  <span className="">Educa</span>
                </Link>
                
                  
              </div>

              
              
              <div className="flex justify-between ">

             
             
                  
            

                  <Link href="/register" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
                    <CiBookmark size = {25}/> SignUp
                  </Link>

                  <Link href="/login" className="ml-5 text-sm font-semibold leading-6 text-gray-900" >
                      <CiLogin size={25} /> login
                  </Link> 
                  
               

               </div>




            </nav>     
          </div>
      
    )

};

export default HeaderLogedOut;
