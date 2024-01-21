'use client';
 
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { VscAdd, VscEdit } from 'react-icons/vsc';

const Courses = () => {
  const [courses,setCourses] =  useState([])

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

    fetch("http://192.168.1.111:8000/content/api/get_teacher_courses/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse( 'localStorageget'),

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
          setCourses(Array(data)[0]) 
        }
      })
      },[])


  return (
      <>      
      
    
    
    
    <div className="bg-white shadow-md p-4  rounded-md m-2 my-2">
   


        <div className="mb-4 flex justify-between items-center ">
          <Link href={"/courses"}><h2 className="text-2xl font-semibold">courses</h2></Link>
          <Link  href={"/courses/add"}>
            <div className=' bg-emerald-500 text-center text-white  p-1   rounded-full'> 
                <VscAdd size = {25}></VscAdd> 
            </div>
          </Link>
        </div>
        <div className="">



              {isWaitLoading == true ? <div className='bg-black rounded-md  p-5 z-40 w-full object-cover object-center opacity-20'>
                <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
              </div>:''} 

              <div class=" overflow-x-auto shadow-md rounded"> 
                  <table class="w-full text-sm ">
                      <thead class=" uppercase bg-stone-200 ">
                          <tr>
                                
                              <th scope="col" class="px-6 py-3">
                                  cour
                              </th>
                              <th scope="col" class="px-6 py-3">
                                  chapiter
                              </th>
                              <th scope="col" class="px-6 py-3">
                                  Status
                              </th>
                              <th scope="col" class="px-6 py-3">
                                  edit
                              </th>
                          </tr>
                      </thead>
                      <tbody> 
                          {courses.map((course) => (
                              <>
                              <tr class=" border-b border-emerald-600 p-1 bg-emerald-100  font-extrabold"> 
                                      <td  class="px-1 py-2 text-center">
                                              {course.title} 
                                      </td>
                                      <td class="px-1 py-2 text-center" >
                                          {course.chapiter}
                                      </td>
                                      <td class="px-1 py-2 text-center" >
                                          <div class="flex items-center justify-center">
                                              {course.status == 'publeshed' ? <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2">  </div> : ""}
                                              {course.status == 'unpubleshed' ? <div class="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> : ""}

                                              {course.status}
                                          </div> 
                                        
                                      </td>
                                      <td class="px-1 py-2 text-center" >
                                        
                                          <Link className="text-center" href={`/courses/update/${course.id}`} key={course.id}> 
                                              <div className = 'm-auto rounded-lg bg-emerald-600 flex justify-center items-center  w-10 p-1 text-white'><VscEdit  size = {25}></VscEdit></div>

                                          </Link>
                                      </td>
                          
                              </tr> 
                              </>
                              ))}
                      </tbody>
                  </table>
              </div> 
        
        </div>
    </div>
      
      
      </>
      
   
 
  );
};

export default Courses;
