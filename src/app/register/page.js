import React from 'react';
import Link from 'next/link';
import { CiAlarmOff, CiApple, CiHeart, CiIndent } from 'react-icons/ci';

const RegistrationPage = () => {
  return (
    <div className = "bg-white rounded m-2 min-h-full grid grid-cols-1" >
         <Link href="/register_student" className="flex  mx-5 my-5 items-center justify-around align-middle bg-white text-blue-400 border border-blue-400 px-8 py-4 rounded-lg text-xl  ">
            <div  >
              <CiApple size={50}></CiApple>
            </div>
            <div  >
                Student  
            </div>
         </Link>
          <Link href ="/register_teacher" className="flex items-center mx-5 my-5 justify-around align-middle bg-white text-blue-400 border border-blue-400 px-8 py-4 rounded-lg text-xl  ">
          <div  >
              <CiApple size={50}></CiApple>
            </div>
            <div  >
                Teacher  
            </div>
          </Link>
          <Link href="/register_parent" className="flex items-center mx-5 my-5 justify-around align-middle bg-white text-blue-400 border border-blue-400 px-8 py-4 rounded-lg text-xl  ">
                <div  >
                  <CiApple size={50}></CiApple>
                </div>
                <div  >
                     Parent
                </div>
          </Link>
        
     </div>
  );
};

export default RegistrationPage;
