"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react'; 
import { VscArrowCircleDown, VscFilePdf, VscPlayCircle  } from "react-icons/vsc";
  
 
const Chapiter = (props) => {  
    const [isWaitLoading, setIsWaitLoading] = useState(true); 

    const [chapiter,setChapiter]  = useState({
        title : '',
        courses : [
            {
            videos_cour : [{teacher : {firstName : "",lastName : ""}}],
            videos_exercice : [{teacher : {firstName : "",lastName : ""}}],

            series : [{teacher : {firstName : "",lastName : ""}}]
            }
        ]    
    
 
    })
    const [content,setContent] = useState({teacher : {firstName : "",lastName : "",imgProfile : ""}})

    const [contentUrl, setcontentUrl] = useState(''); 
    const [teacher, setTeacher] = useState(''); 

    const [contentPages, setcontentPages] = useState(''); 

    const [selectedTab, setSelectedTab] = useState('cours');  

    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [message, setMessage] = useState("");
  
 
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
          }  
        }) 
        .then((data) => { 
             if (data) {
                setChapiter(data)  
                changeContent(data.courses[0].videos_cour[0]) 
                setTeacher(data.courses[0].teacher) 
            }
        }) 
    })
  
    const changeContent = (content,teacher) =>{
         
        setContent(content)
        setcontentUrl('')
        setcontentPages('')
        setTeacher(teacher)
        if (content.url && content.url.substring(12,19) != 'youtube'){
            console.log('test1')
            setIsWaitLoading(true)
            fetch(content.url)
                .then((response) => response.blob())
                .then((blob) => { 
                    const contentUrl = URL.createObjectURL(blob);
                    setcontentPages('');
                    setcontentUrl(contentUrl);
                    setIsWaitLoading(false)
            })  
        }else if(content.url && content.url.substring(12,19) == 'youtube' ){

            console.log('test2') 
            setcontentUrl(content.url)
            setcontentPages('');
            setIsWaitLoading(false)
            
        }else if(!content.url){
            console.log('test3') 
            setcontentUrl('')
            setcontentPages(content.pages);
            setIsWaitLoading(false)
            
            
        }
       
    } 
 
    const changeTab = (tab) => {
        setSelectedTab(tab);
    }; 

    return (
        <>
            <div className='py-3 bg-emerald-50 flex flex-wrap   justify-around'> 
                <div className='w-screen max-w-xl '>
                    <div  className='w-full '> 
                            { contentUrl && (<>  
                                                <iframe src={contentUrl} allowFullScreen  width="100%"  className='h-72'  >
                                                </iframe> 
                                                
                                            </>) 
                                            
                            }   
                            { contentPages && (<div className=' overflow-scroll h-96' width="100%"  >  
                                                    {contentPages.map(page => (
                                                        <img src={'http://192.168.1.111:8000/media/' + page.content} key={page.id} alt="PDF Content" /> 
                                                        
                                                    ))} 
                                            </div>) }
                            { (!contentPages && !contentUrl ) ?
                                <div className='bg-black rounded-md p-5 z-40 w-full object-cover object-center opacity-20 h-60 flex items-center'>
                                    <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
                                </div> : ""

                            }
                                            
                    </div> 

                    <div className="mt-2 w-full   rounded-md " >
                            
                            {(contentUrl || contentPages) ? (
                                        <div className="flex items-center">
                                            <img src= {"http://192.168.1.111:8000/media/" + teacher.imgProfile}  className="rounded-full w-16 h-16 bg-slate-300 "></img > 
                                            <div className="flex items-center m-2 text-blue-400 "> {teacher.firstName + " " + teacher.lastName} </div>
                                        </div>  
                                    ) : <div className="flex items-center">
                                            <div className='bg-black p-2 z-40 rounded-full h-12 w-12 object-cover object-center opacity-20 flex items-center'>
                                                <div  className=" w-full h-full border-4 border-gray-200 border-dashed rounded-full animate-spin z-40"></div>
                                            </div>
                                
                                        </div>        
                            } 

                            {(contentUrl || contentPages) ? (<div className="flex items-center justify-between m-2">
                                <p className=" font-semibold text-emerald-950">attachment :</p>
                                <p>    
                                    <a href = {"http://192.168.1.111:8000/media/"+content.attachment} class="button flex bg-red-300 rounded-lg p-1  items-center m-2">  
                                        <VscArrowCircleDown size={25} className='text-emerald-900 m-1'></VscArrowCircleDown>
                                        <VscFilePdf size={25} className='text-red-800 m-1'></VscFilePdf>
                                        
                                    </a>
                                </p>
                            </div> ) : "" }

                    </div>   
                </div> 
                
                
                <div className='w-screen max-w-md border-emerald-200 bg-emerald-200 border rounded-xl'>
                    <div className='bg-emerald-400 text-gray-700 font-extrabold rounded-t-md h-12 flex justify-around'>
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

                    <div className=" overflow-hidden">
                        {selectedTab === 'cours' && (
                            <div className='w-full'>
                                <ul className="w-5/6 m-auto px-2">
                                    {chapiter.courses.map(course => (
                                        <>
                                        <h1>{course.title}</h1>
                                        {course.videos_cour.map(video => (
                                            <li key={video.id} className="my-2 pb-2 flex justify-between border-b border-emerald-900" onClick={() => changeContent(video,course.teacher)}>
                                                <span className=" overflow-hidden w-4/5">{video.title}</span>
                                                <VscPlayCircle size={25} className='text-emerald-800 font-extrabold'></VscPlayCircle>
                                            </li>
                                        ))}
                                        </>
                                    ))}
                                    
                                </ul>
                            </div>
                        )} 
                        {selectedTab === 'exercice' && (
                            <div className='w-full'>
                                <ul className="w-5/6 m-auto px-2"> 
                                            {chapiter.courses.map(course => (
                                                <>
                                                <h1>{course.title}</h1>
                                                {course.videos_exercice.map(video => ( 
                                                    <li key={video.id} className="my-2  pb-2 flex justify-between border-b border-emerald-900"  onClick={() => changeContent(video,course.teacher)}> 
                                                        <p className="pl-5 max-w-md">{video.title}</p>
                                                        <VscPlayCircle size = {25} className=' text-emerald-800 font-extrabold'></VscPlayCircle>
                                                    </li>
                                                ))} 
                                                </>
                                            ))}
                                            
                                    
                                    </ul>
                            </div>
                        )} 
                        {selectedTab === 'série' && (
                            <div className='w-full'>            
                                <ul className="w-5/6 m-auto px-2"> 
                                            {chapiter.courses.map(course => (
                                                <>
                                                <h1>{course.title}</h1>
                                                {course.series.map(serie => ( 
                                                    <>
                                                        <li className="my-2  pb-2 flex justify-between border-b border-emerald-900"  onClick={() => changeContent(serie,course.teacher)}> 
                                                            <p className="pl-5 max-w-md">{serie.title}</p>
                                                            <VscFilePdf size = {25} className=' text-emerald-800 font-extrabold'></VscFilePdf>
                                                        </li>
                                                        { serie.correction[0] ? <li className="my-2  pb-2 flex justify-between border-b border-emerald-900"  onClick={() => changeContent(serie.correction[0],course.teacher)} > 
                                                            <p className="pl-5 max-w-md">correction {serie.title}</p>
                                                            <VscFilePdf size = {25} className=' text-emerald-800 font-extrabold'></VscFilePdf>
                                                        </li> : ''}
                                                    </>
                                            ))} 
                                                </>
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
