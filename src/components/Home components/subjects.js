'use client';
import { counter } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Subject = () => {
  const [subjects,setSubjects] =  useState([])

  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [message, setMessage] = useState("");
  const openPopUp = () => {
      setPopUpOpen(true);
  }
  const closePopUp = () => {
      setPopUpOpen(false);
  } 
  
  const [isWaitLoading, setIsWaitLoading] = useState(true);


  useEffect(()=>{

    fetch("https://educa-back.vercel.app/content/api/get_subjects/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
     
    })
      .then((response) => {
         if (response.status === 200) {
          setIsWaitLoading(false)
          return response.json();
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      })
      .then((data) => {
        if (data) {
          setSubjects(Array(data)[0]) 
        }
      })
      },[])


  return (
      <>      
      
    
    
    
    <div className="bg-white shadow-md rounded p-4 my-4">
   


        <div className="mb-4">
          <Link href={"/subjects"}><h2 className="text-2xl font-semibold">Subjects</h2></Link>
        </div>
        <div className="my-progress-list">



        {isWaitLoading == true ? <div className='bg-black rounded-md  p-5 z-40 w-full object-cover object-center opacity-20'>
          <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
      </div>:''}



          {subjects.map((subject) => (

             

            <Link className="my-progress-item" href={`/subjects/${subject.id}`} key={subject.id}>
              <div className="flex items-center">
                <div className="mr-4">
                  <img
                    src={"https://educa-back.vercel.app/media/" + subject.image}
                    alt={subject.title}
                    className=" h-10 w-10 m-2"
                  />
                </div>
                <div className="flex flex-col ">
                  <span className="text-lg font-semibold text-blue-400 text-xl text-cursive">{subject.title}</span>
                  <div className="flex items-center mt-2 hidden">
                    <div className="w-44 h-4 bg-blue-200 rounded-full">
                      <div
                        className="bg-blue-500 h-full rounded-full"
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    <span className="ml-2">{subject.progress}%</span>
                  </div>
                </div>  
              </div>
            </Link>

          ))}
        </div>
      </div>
      
      
      </>
      
   
 
  );
};

export default Subject;
