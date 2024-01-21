"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const Subject = (props) => {   
          const [subject,setSubject] =  useState({chapiters : []}) 

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

            fetch("http://192.168.1.111:8000/content/api/subject/" +(props.params.id), {
              method: "get",
              headers: {
                'Authorization': 'token ' + JSON.parse( localStorage.getItem('token')),
                "Content-Type": "application/json",
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
                  if (data && data.length > 0) {
                    setSubject(data[0])  
                    const updatedChapiters = data[0].chapiters.map((chapter, index) => {
                      return { ...chapter, counter: index + 1 };
                    });

                    setSubject(prevState => ({
                      ...prevState,
                      chapiters: updatedChapiters,
                    })); 
                }
              }) 
          },[])


          return (
            <>
            <div className=" transition-d  bg-white   shadow-md rounded-xl   p-1 m-2 max-w-md">
              <div className="m-2">
                <h2 className="text-2xl font-semibold"> subject</h2>
              </div>


              <div className="my-progress-list">
            
                    <div className="flex items-center">
                      {isWaitLoading == true ? <div className='bg-black rounded-md  p-5 z-40 w-full object-cover object-center opacity-20'>
                      <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
                      </div> : <><div className="mr-4">
                        <img
                          src={"http://192.168.1.111:8000/media/" + subject.image}

                          alt={subject.title}
                          className="w-10 h-10 m-2"
                        />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-lg font-semibold">{subject.title}</span>
                            <div className="flex items-center mt-2">
                            
                                <div style={{width : '150px'}} class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                  <div class="bg-emerald-500 h-2 rounded-full" style={{ width: `${subject.progress + 5}%` }}  ></div>
                                </div>
        
                                <span className="ml-2  font-semibold">{subject.progress} %</span>
                            </div>
                          </div> </> }

                    </div>
                  
              
              </div><br></br>
          
            </div>
            <div className="bg-white transition-d shadow-md rounded-xl border-blue-500 p-2 m-3 ">
                <h2 className="text-2xl font-semibold" >chapiters : </h2> 
                {isWaitLoading == true ? <div className='bg-black rounded-md  p-5 z-40 w-full object-cover object-center opacity-20'>
                  <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
                </div>:''}
                {subject.chapiters.length === 0 && isWaitLoading === false ? 'there is no content' : '' }
                {subject.chapiters.map(chapiter => ( 
                  
                  <Link className="" href={`/chapiters/${chapiter.id}`} key={chapiter.id}>
                      <div   className = ' p-2 bg-emerald-50 rounded-xl mx-1 my-3  '>
                              <div className='m-2 flex  '>
                                  <h2 className='text-red-400    m-2 text-2xl font-semibold' >{chapiter.counter}</h2>
                                  <h2 className='text-gray-700  m-2  text-2xl font-semibold'>{chapiter.title} : </h2>
                                  
                              </div> 
                              <div className="flex items-center ml-10 mt-2">
                                
                                <div style={{width : '150px'}} class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                  <div class="bg-emerald-500 h-2 rounded-full" style={{ width: `${chapiter.progress + 5}%` }}  ></div>
                                </div>

                                <span className="ml-2  font-semibold">{chapiter.progress} %</span>
                            </div>
                      </div>
                  </Link>

                ))} 
            </div>

            </>
          );
  
};

export default Subject;