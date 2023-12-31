"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
 import { VscArrowCircleDown, VscFilePdf, VscPlayCircle, VscTriangleRight } from "react-icons/vsc";

const Chapiter = (props) => {   

    const [chapiter,setChapiter]  = useState({
        title : '',
         
            videos_cour : [{teacher : {firstName : "",lastName : ""}}],
            videos_exercice : [{teacher : {firstName : "",lastName : ""}}],

            series : [{teacher : {firstName : "",lastName : ""}}]
             
    
 
    })
    const [content,setContent] = useState({teacher : {firstName : "",lastName : "",imgProfile : ""}})



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
  
      fetch("http://192.168.1.111:8000/content/api/chapiter/" +(props.params.id), {
        method: "get",
        headers: {
          'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
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
             if (data) {
                setChapiter(data)  
                setContent(data.videos_cour[0])
 
            }
        }) 
    },[])

    const changeVideo = (content) =>{
        setContent(content)
       
    } 


    const [videoUrl, setVideoUrl] = useState(''); 
    useEffect(() => {
             setVideoUrl('')
             fetch(content.url)
                .then((response) => response.blob())
                .then((blob) => {
                    const videoURL = URL.createObjectURL(blob);
                    setVideoUrl(videoURL);
                })  
     },[content]);
 

    const [selectedTab, setSelectedTab] = useState('cours');  

    const changeTab = (tab) => {
        setSelectedTab(tab);
    };


  return (
    <>
    <div className='py-3 bg-emerald-50 flex flex-wrap  justify-around'> 
        <div className='w-screen max-w-xl'>
            <div  className='w-full'> 
                    {videoUrl ? (
                                <video controls   autoPlay  className='w-full' >
                                    <source src={videoUrl} type="video/mp4"/>
                                </video>
                            ) : <div className='bg-black rounded-md p-5 z-40 w-full object-cover object-center opacity-20 h-60 flex items-center'>
                                      <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
                            </div>
                    } 










                    
            </div> 

            <div className="mt-2 w-full   rounded-md p-" >
                    
                    {videoUrl ? (
                                <div className="flex items-center">
                                      <img src= {"http://192.168.1.111:8000/media/" + content.teacher.imgProfile}  className="rounded-full w-16 h-16 bg-slate-300 "></img > 
                                      <div className="flex items-center m-2 text-blue-400 "> {content.teacher.firstName + " " + content.teacher.lastName} </div>
                                 </div>  
                            ) : <div className="flex items-center">
                                    <div className='bg-black p-2 z-40 rounded-full h-12 w-12 object-cover object-center opacity-20 flex items-center'>
                                           <div  className=" w-full h-full border-4 border-gray-200 border-dashed rounded-full animate-spin z-40"></div>
                                     </div>
                        
                                </div>  
                            
                            
                            
                            
                           
                    } 

                    <div className="flex items-center justify-between m-2">
                        <p className=" font-semibold text-emerald-950">attachment :</p>
                        <p>    
                            <a href="files/document.pdf" class="button flex bg-red-300 rounded-lg p-1  items-center m-2">  
                                <VscArrowCircleDown size={25} className='text-emerald-900 m-1'></VscArrowCircleDown>
                                <VscFilePdf size={25} className='text-red-800 m-1'></VscFilePdf>
                                
                            </a>
                        </p>
                    </div> 

            </div>   
        </div> 
 
        <div className='w-screen max-w-md border-emerald-200 bg-emerald-200 border rounded-xl'>
            <div className='bg-emerald-400 text-gray-700 font-extrabold rounded-md h-12 flex justify-around'>
                <button className={`mx-1 ${selectedTab === 'cours' ? 'font-bold' : ''}`} onClick={() => changeTab('cours')}>
                    cours
                </button>
                <button className={`mx-1 ${selectedTab === 'exercice' ? 'font-bold' : ''}`} onClick={() => changeTab('exercice')}>
                    exercice
                </button>
                <button className={`mx-1 ${selectedTab === 'série' ? 'font-bold' : ''}`} onClick={() => changeTab('série')}>
                    série
                </button>
            </div>

            <div className="">
                {selectedTab === 'cours' && (
                    <div className='w-full'>
                        <ul className="w-5/6 m-auto px-2">
                            {/* Render videos_cour list */}
                            {chapiter.videos_cour.map(video => (
                                <li className="my-2 pb-2 flex justify-between border-b border-emerald-900" onClick={() => changeVideo(video)}>
                                    <p className="pl-5">{video.title}</p>
                                    <VscPlayCircle size={25} className='text-emerald-800 font-extrabold'></VscPlayCircle>
                                </li>
                            ))}
                        </ul>
                    </div>
                )} 
                {selectedTab === 'exercice' && (
                    <div className='w-full'>
                         <ul className="w-5/6 m-auto px-2"> 
                                    {chapiter.videos_exercice.map(video => ( 
                                            <li className="my-2  pb-2 flex justify-between border-b border-emerald-900"  onClick={() => {changeVideo(video)}}> 
                                                <p className="pl-5 ">{video.title}</p>
                                                <VscPlayCircle size = {25} className=' text-emerald-800 font-extrabold'></VscPlayCircle>
                                            </li>
                                    ))} 
                            
                            </ul>
                    </div>
                )} 
                {selectedTab === 'série' && (
                    <div className='w-full'>
                           
                           <ul className="w-5/6 m-auto px-2"> 
                                    {chapiter.series.map(video => ( 
                                            <li className="my-2  pb-2 flex justify-between border-b border-emerald-900"  onClick={() => {changeVideo(video)}}> 
                                                <p className="pl-5 ">{video.title}</p>
                                                <VscPlayCircle size = {25} className=' text-emerald-800 font-extrabold'></VscPlayCircle>
                                            </li>
                                    ))} 
                            
                            </ul>
                    </div>
                )}
            </div>
        </div>
 
          
    </div>

    </>
  );
};

export default Chapiter;
