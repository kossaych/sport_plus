'use client';
import Link from 'next/link';
import React, { use, useEffect, useRef } from 'react';
import {CiBoxes} from 'react-icons/ci';

 
const Offer = ({ username, offer, expirationDate, progress }) => {
      const offerRef= useRef()
      
      return (
        <div ref = {offerRef} className=" p-4 shadow-md rounded-lg border border-blue-900 m-2  bg-gradient-to-r from-sky-300 to-blue-400" >
          {offer != 'no offer' ?  
          
          <div>
          <div className="mb-4">

<h2 className="text-xl text-center m-4 text-gray-800">
 Hello {username} !
</h2>
</div>
              <h2 className="text-xl text-center text-red-600 ">{offer}</h2>

              <div className="flex flex-col">
                <div className="flex items-center mt-2">
                  <div className="w-80 h-4 bg-blue-200 rounded-full">
                    <div
                      className="bg-blue-500 h-full rounded-full"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
            <p className="text-gray-700">
              Date d'expiration : {expirationDate}
            </p>
              </div>
          </div>
          
           :null}
          
          
            {true ?
            <div className='flex '>
                  < Link href="/"> <CiBoxes size={80} className="m-auto text-white" /></Link>
                  <p className='text-center text-white font-bold text-4xl pt-5 pl-5'>Offfers</p>
                  
             </div>
            : null} 
        </div> )
};

export default Offer;
