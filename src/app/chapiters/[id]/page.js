//"use client";
//import React, { useEffect, useState } from 'react';
//import Link from 'next/link';

import { CiAlarmOn } from "react-icons/ci";
import { VscTriangleRight } from "react-icons/vsc";

const Chapiter = (props) => {  
  
 
  return (
    <>
    <div className=''> 
        <div  className=' bg-gray-100 h-80 w-full m-auto'>
                <div id ='content' className='  w-full h-60 m-auto block'>
                    <iframe  className="m-auto w-full h-60"
                        src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1">
                    </iframe>
                </div>
                <div className="bg-gray-50 h-20" >
                    <div className="  flex m-2">
                         <div  className="rounded-full h-12 w-12 bg-slate-300 "></div > <div className="flex items-center m-2 text-blue-400 "> koussay chemingui </div>
                    </div> 
                    
                    <div className="flex  w-56  m-auto">
                        attachment :
                        <p>    
                            <a href="files/document.pdf" class="button">
                            <i class="fa fa-download"></i>
                                Download CV
                            </a>
                        </p>
                    </div>
                </div>

        </div>

        <div  className='m-2 rounded-xl'>
            <dev className='bg-blue-400 rounded-md h-14 border-b-2 border-gray-600 flex justify-around text-white'>
                <button  className=' mx-1'>cours</button>
                <button  className=' mx-1'>exercice</button>
                <button className=' mx-1' >série</button> 
            </dev>

            <div>
                <ul>
                    <li className="m-2 flex justify-around"> <p className="flex items-center w-2/3 pl-5">test</p> <p className=" flex items-center"> <VscTriangleRight className='text-blue-400' size={25}> </VscTriangleRight></p></li>
                </ul>
            </div>


        </div> 
    </div>

    </>
  );
};

export default Chapiter;
