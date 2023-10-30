'use client';
import React, { use, useEffect, useRef } from 'react';
interface OfferProps {
    username: string;
    offer: string;
    expirationDate?: string;
    progress?: number;
  }
 
const Offer = ({ username, offer, expirationDate, progress } : OfferProps) => {
      const offerRef= useRef()
      
      return (
        <div ref = {offerRef} className=" bg-blue-200 p-4 shadow-md rounded-lg border-2 border-green-700  m-2" >
          <div className="mb-4">

            <h2 className="text-xl text-center m-4 text-gray-800">
             Hello {username} !
            </h2>
          </div>


          {offer != 'no offer' ? <div>
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
          </div> : 'test'}
          







          
        </div>
  );
};

export default Offer;
