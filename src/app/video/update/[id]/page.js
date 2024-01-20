'use client'
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import PopUp from '/src/components/general/pop-up.js'
import { VscAdd, VscDeviceCamera, VscDeviceCameraVideo, VscEdit, VscEye, VscEyeClosed, VscFile, VscFilePdf, VscGift, VscListFilter, VscListFlat, VscListOrdered, VscLock, VscMegaphone, VscScreenFull, VscScreenNormal, VscTrash, VscTriangleRight, VscWatch } from "react-icons/vsc";
import { CiEdit, CiYoutube } from "react-icons/ci";



function UpdateCourse(props) {
  const inputStyle = "m-1 border focus:outline-none border-blue-200 rounded bg-blue-100 p-1"
 
  
  const [course, setCourse] = useState({
    
    chapiter : {id : ''}
  });

  const [series, setSeries] = useState([
    
  ]);
  const [serie, setSerie] = useState(
    { 
      title : '', 
      file : '',
      ordre : 0,
      offer : '',
    },
  );

  const [videos, setVideos] = useState([]);
  
  const [video, setVideo] = useState(
    { 
      title : '', 
      url : '',
      attachment : '',
      file : '',
      offer : 'paid',
      type : 'course',
    }
  );

  const [chapiters, setChapiters] = useState([]);


  //////////////////// auxs ///////////////////////////////
  const [isWait, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  const [embedYoutube, setEmbedYoutube] = useState(false);
  const [attachmentKey, setAttachmentKey] = useState(0); // Key to reset the input
  const [videoKey, setVideoKey] = useState(0); // Key to reset the input


 

  const openPopUp = () => {
    setPopUpOpen(true);
  }
  const closePopUp = () => {
    setPopUpOpen(false);
  }
  
  ////////////////////////////////////////

 
  
  // fetch chapiters
  useEffect(()=>{
    fetch("http://192.168.1.111:8000/content/api/get_teacher_desipline_chapiters/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
     
    })
      .then((response) => {
         if (response.status === 200) {
          return response.json();
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      })
      .then((data) => {
        if (data) {
          setChapiters(Array(data)[0])
          
        }
      });
   ;},[])

     // fetch chapiters
  useEffect(()=>{
    fetch("http://192.168.1.111:8000/content/api/course_pk/" + +(props.params.id), {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      
     
    })
      .then((response) => {
         if (response.status === 200) {
          return response.json();
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      })
      .then((data) => { 
          setCourse(data)
          setVideos(data.videos)
      });
   ;},[])



   const handleUpdateCourse = () => {

    fetch("http://192.168.1.111:8000/content/api/course_pk/" + +(props.params.id), {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),

      },
      body: JSON.stringify(course),
     
    })
      .then((response) => {
         if (response.status === 200) {
          
        } else {
          setPopUpOpen(true)
          setMessage('server error try again !');
        }
      }) 

   }
   
    const handleSeriesTitleChange = (index, newValue) => {
      const updatedSeries = [...series]; // Copie de la liste actuelle
      updatedSeries[index].title = newValue; // Mise à jour du titre de l'objet spécifié
      setSeries(updatedSeries); // Mise à jour de l'état
      console.log(series)
    };
  
    const handleSeriesofferChange = (index, newOffer) => {
      const updatedSeries = [...series];
      updatedSeries[index].offer = newOffer;
      setSeries(updatedSeries);
      console.log(series)
    };

    // Fonction pour gérer le changement de fichier
    const handleSeriesFileChange = (index, newValue) => {
      const updatedSeries = [...series];
      updatedSeries[index].file = newValue;
      setSeries(updatedSeries);
      console.log(series)
    }; 

    // Fonction pour supprimer une série
    const deleteSerie = (index) => {
      const updatedSeries = [...series];
      updatedSeries.splice(index, 1);
      setSeries(updatedSeries);
      console.log(series)
    }; 
    // Fonction pour mettre à jour le titre
    const handleSerieTitleChange = (newValue) => {
      setSerie({ ...serie, title: newValue });
    };

    // Fonction pour changer l'offre
    const handleSerieofferChange = (newOffer) => {
      setSerie({ ...serie, offer: newOffer });
    };

    // Fonction pour gérer le changement de fichier
    const handleSerieFileChange = (newValue) => {
      setSerie({ ...serie, file: newValue });
    };

    // Fonction pour ajouter une série
    const addSerie = () => {
      if(serie.title != "" && serie.file != ""){
        setSeries([...series, serie]); // Ajout de 'serie' à la liste 'series'
        // Réinitialisation de 'serie' pour préparer un nouvel ajout
        console.log(series)
        setSerie({
          title: '',
          file: '',
          ordre: 0,
          offer: '',
        });

      }else {
        setPopUpOpen(true)
            setMessage('remplir les cordonnées de serie !');
      }
    
    };
  
    const handleVideosTitleChange = (index, newValue) => {
      const updatedVideos = [...videos]; // Copie de la liste actuelle
      updatedVideos[index].title = newValue; // Mise à jour du titre de l'objet spécifié
      setVideos(updatedVideos); // Mise à jour de l'état
      console.log(videos)
    };
  
    const handleVideosOfferChange = (index, newOffer) => {
      const updatedVideos = [...videos];
      updatedVideos[index].offer = newOffer;
      setVideos(updatedVideos);
      console.log(videos)
    };

    // Fonction pour gérer le changement de fichier
    const handleVideosFileChange = (index, newValue) => {
      const updatedVideos = [...videos];
      updatedVideos[index].file = newValue;
      setVideos(updatedVideos); 
    };


    const handleVideosTypeChange = (videoIndex, neVideoType) => {
      const updatedVideos = [...videos];
      updatedVideos[videoIndex].type = neVideoType;
      setVideos(updatedVideos); 
    };



 
    // Fonction pour supprimer une série
    const deleteVideo = (index) => {
      const updatedvideos = [...videos];
      updatedvideos.splice(index, 1);
      setVideos(updatedvideos);
      console.log(videos)
    }; 
     // Fonction pour mettre à jour le titre
     const handleVideoTitleChange = (newValue) => {
      setVideo({ ...video, title: newValue });
    };
  
    // Fonction pour changer l'offre
    const handleVideoOfferChange = (newOffer) => {
      setVideo({ ...video, offer: newOffer });
    };

    const handleVideoTypeChange = (newType) => {
      setVideo({ ...video, type: newType });
    };
  
    // Fonction pour gérer le changement de fichier
    const handleVideoFileChange = (e) => {
      setVideo({ ...video, url: '' });

      let newValue = e.target.files[0] 
      setVideo({ ...video, file: newValue , url:''});
      setVideoKey((prevKey) => prevKey + 1);

    };

    // Fonction pour gérer le changement de fichier
    const handleVideoAttachmentChange = (e) => {
      console.log(e)
      let newValue = e.target.files[0] 
      if (newValue.type != 'application/pdf') {
          setPopUpOpen(true)
          setMessage('attachment file have to be a pdf file'); 
      } 

      setVideo({ ...video, attachment: newValue });
      setAttachmentKey((prevKey) => prevKey + 1);

       
    };

     // Fonction pour mettre à jour le titre
     const handleVideoUrlChange = (newValue) => { 
      setVideo({ ...video, url: newValue,file: '' });
    };
  
    // Fonction pour ajouter une série
    const addvideo = () => {
      
        setVideos([...videos, video]); // Ajout de 'video' à la liste 'videos'
        // Réinitialisation de 'video' pour préparer un nouvel ajout 
         setVideo({ 

          title : '', 
          url : '',
          attachment : '',
          file : '',
          offer : '',
          type : 'course',
        });  

      }

    const handleAddVideo = () => {
      var videoData = new FormData()
      videoData.append(' title',video.title) 
      videoData.append('url',video.url)
      videoData.append('attachment',video.attachment)
      videoData.append('file',video.file)
      videoData.append('offer',video.offer)
      videoData.append('type',video.type)
      videoData.append('course',course.id)  
      fetch("http://192.168.1.111:8000/content/api/video/" , {
        method: "post",
        headers: { 
          'Authorization': 'token ' + JSON.parse(localStorage.getItem('token')),
  
        },
        body: videoData,
       
      })
        .then((response) => {
           if (response.status == 200) { 
            videoData = "" 
            addvideo() 
          } else if(response.status == 400) {
            return response.json() 
          }else{
            return 'server error ! '
          }
        }).then((data) => {
          if (data != undefined){
            setPopUpOpen(true)
            setMessage(data);
          }
 
        })
  
     }
     




  return (
        <div className="text-center rounded bg-white  border    my-3 p-1 mx-3 ">
            <PopUp isOpen={isPopUpOpen} onClose={closePopUp} >
                                        <h2 className="text-red-500 w-72">{message}</h2>       
            </PopUp>  
            <div className="flex flex-wrap">
                    <div className="flex w-full items-end flex-wrap  justify-start">
                          <div className="text-center rounded bg-white  border   w-full md:w-3/4 xl:w-2/6  my-3 p-1 mx-3 "> 

                                                <div  className="flex justify-between items-center " >
                                                                    <h3 className="text-blue-500 text-2xl font-bold">course</h3>
                                                                  {course.status == 'published' ?<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'unpublished' }) } >
                                                                    <VscEye size ={25}  ></VscEye>
                                                                    <span className="m-1">published </span> 
                                                                  </div> 
                                                                  :<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'published' }) } >
                                                                    <VscEyeClosed size={25}></VscEyeClosed>
                                                                    <span className="m-1"> unpublished </span> 
                                                                  </div> }         
                                                </div>
        
                                                <div className="grid grid-cols-1 ">                     
                                                              <input className={inputStyle} value={course.title}  type="text"   placeholder="Titre" onChange = {(e) => setCourse({ ...course, ['title']: e.target.value }) }  />  
                        
                                                              <select  className={inputStyle}    id='chapiter' value={course.chapiter.id}   onChange = {(e) => setCourse({ ...course, ['chapiter']: e.target.value }) }   >
                                                                      <option>chapiter</option>
                                                                      {chapiters.map(o => (
                                                                          <option key={o.id} value={o.id}>{o.title}</option>
                                                                      ))}    
                                                              </select> 
                                                </div> 
                                
                     
                     
                          </div> 
                        
                          <div className="text-center w-5/6 grid grid-cols-1 place-items-center">
                                                    {isWait === false ? (
                                                      <button className="border rounded-md h-10   bg-blue-600 p-1 text-white w-1/2" onClick={handleUpdateCourse} >
                                                          Sauvgarder
                                                      </button>
                                                    ) : (
                                                      <button disabled className="rounded border   bg-gray-600 text-white p-1" >
                                                        <div className="max-h-10">
                                                            <div  className="w-8 h-8 border-4   border-dashed rounded-full animate-spin m-auto"></div>
                                                        </div>
                                                      </button>
                                                    )} 
                          </div>         
                    </div>





                    <div className="  text-center rounded bg-white  border   w-full md:w-3/4 xl:w-1/2 my-3 p-4 mx-3 "> 
                                          <div  className="flex justify-between items-center " >
                                                              <h3 className="text-blue-500 text-2xl font-bold">Series</h3>
                                                        
                                          </div> 
                                          { series.length != 0 ? <div className="bg-gray-100 justify-center rounded-lg mb-1 pb-1 md:p-2">
                                                  {series.map((serie, index) => (
                                                    <div className="flex h-12 items-center justify-around border-b border-emerald-900 mb-2 mx-0.5" key={index}>
                                                      <VscListOrdered size={20} className='text-blue-500' />
                                                      <input 
                                                        value={serie.title}
                                                        accept = '.pdf'
                                                        className="w-20 focus:outline-none bg-gray-200 rounded-lg p-1"
                                                        onChange={(e) => handleSeriesTitleChange(index, e.target.value)} // Gestion du changement de titre
                                                      />



                                                      <div className="bg-gray-300  rounded-full p-1.5">
                                                        {serie.offer === 'free' ? (
                                                          <>
                                                          <VscGift  onClick={() => handleSeriesofferChange(index, 'paid')} size={16} className='text-green-500' />
                                                          
                                                          </>
                                                        ) : (
                                                          <>
                                                          <VscLock onClick={() => handleSeriesofferChange(index, 'free')} size={16} className="text-red-500" />
                                                  
                                                          </>
                                                        )}
                                                      </div>




                                                      <label className="bg-red-200 text-red-500 rounded-full p-1">
                                                        <VscFilePdf size={19} />
                                                        <input 
                                                          type="file" 
                                                          id={`fileInput_${index}`} 
                                                          accept = '.pdf'
                                                          className="hidden"  
                                                          onChange={(e) => handleSeriesFileChange(index, e.target.value)} 
                                                        />
                                                      </label>
                                                      <button className="bg-gray-500 text-white text-xl rounded-full p-1" onClick={() => deleteSerie(index)}>
                                                        <VscTrash />
                                                      </button>
                                                    </div>
                                                  ))}
                                          </div>:""} 

                                          <div className="grid grid-cols-1 rounded-lg p-2  ">   
                                            <span className="text-start text-lg font-extrabold "> Ajouter une Série :</span>
                                              <div className="flex w-full justify-between mt-2">
                                                    <div className="bg-gray-100 flex items-center justify-between p-2 rounded-lg mb-1 w-5/6">
                                        
                                                        <input
                                                          value={serie.title}
                                                          className="w-1/2 focus:outline-none bg-gray-200 rounded p-1"
                                                          onChange={(e) => handleSerieTitleChange(e.target.value)} // Gestion du changement de titre
                                                        />

                                                        <div className="bg-gray-300 rounded-full p-1.5">
                                                          {serie.offer === 'free' ? (
                                                            <VscGift onClick={() => handleSerieofferChange('paid')} size={16} className='text-green-500' />
                                                          ) : (
                                                            <VscLock onClick={() => handleSerieofferChange('free')} size={16} className="text-red-500" />
                                                          )}
                                                        </div>

                                                        <label className="bg-red-200 text-red-500 rounded-full p-1">
                                                          <VscFilePdf size={19} />
                                                          <input
                                                            type="file"
                                                            accept = '.pdf'
                                                            className="hidden"
                                                            onChange={(e) => handleSerieFileChange(e.target.value)}
                                                          />
                                                        </label>
                                                      </div>
                                                
                                                    <button className="bg-emerald-500  p-1  m-3 flex justify-center items-center text-white rounded-full" onClick={addSerie}>
                                                      <VscAdd size = {25}></VscAdd>
                                                    </button>
                                              </div>             
                                          </div>              
                          
                    </div> 


                    <div className="  text-center rounded bg-white  border   w-full md:w-3/4 xl:w-1/2 my-3 p-2 mx-3 "> 
                                      
                            <div  className="flex justify-between items-center " >
                                                <h3 className="text-blue-500 text-2xl font-bold">Videos</h3>
                                          
                            </div>
                            { videos.length != 0 ? <div className="bg-gray-100 justify-center rounded-lg mb-1 pb-1 md:p-2">
                                    {videos.map((video, index) => (
                                      <div>
                                            <div className="flex h-12 items-center justify-around border-b border-emerald-900 mb-2 mx-0.5" key={index}>
                                              <VscListOrdered size={20} className='text-blue-500' />
                                        
                                              <input  
                                                value={video.title}
                                                className="w-1/2 focus:outline-none bg-gray-200 rounded-lg p-1"
                                                onChange={(e) => handleVideosTitleChange(index, e.target.value)} // Gestion du changement de titre
                                              /> 
                                      

                                              <select  className={inputStyle}    id='chapiter' value={video.type}   onChange={(e) => handleVideosTypeChange(index, e.target.value)}   >
                                                  <option  value={video.type} >{video.type}</option>  
                                                  {video.type == 'course' ?<option   value='exercice'>exercice</option> :''} 
                                                  {video.type == 'exercice' ? <option   value='course'>course</option> : '' } 
                                              </select> 
      
                                              <div  className="flex justify-between items-center " >
                                                                        {video.status == 'published' ?<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'unpublished' }) } >
                                                                          <VscEye size ={25}  ></VscEye> 
                                                                        </div> 
                                                                        :<div className=" bg-emerald-100  rounded-md p-1 m-0.5  flex items-center" onClick = {(e) => setCourse({ ...course, ['status']: 'published' }) } >
                                                                          <VscEyeClosed size={25}></VscEyeClosed> 
                                                                        </div> }         
                                              </div> 
                                              <div className="bg-gray-300  rounded-full p-1.5">
                                                {video.offer === 'free' ? (
                                                  <>
                                                  <VscGift  onClick={() => handleVideosOfferChange(index, 'paid')} size={16} className='text-green-500' />
                                                  
                                                  </>
                                                ) : (
                                                  <>
                                                  <VscLock onClick={() => handleVideosOfferChange(index, 'free')} size={16} className="text-red-500" />
                                          
                                                  </>
                                                )}
                                              </div> 
                                              
                                              <button className="bg-gray-500 text-white text-xl rounded-full p-1" onClick={() => deleteVideo(index)}>
                                                <VscTrash />
                                              </button>
                                              <button className=" bg-green-500 text-white text-xl rounded-full p-1" onClick={() => deleteVideo(index)}>
                                                <CiEdit ></CiEdit>
                                              </button>





















                                            </div>



                                            
                                        <div className="bg-gray-100 flex items-center   justify-between p-1 rounded-lg mb-1 w-full">
                                        
                                              <div>
                                                <label className=" border-dashed border-4  border-gray-200 bg-gray-100 flex flex-wrap text-gray-500 rounded mt-3 p-1">
                                                    <textarea
                                                      type="text"
                                                      
                                                      className="w-full bg-slate-100 rounded-md focus:outline-none"
                                                      value = {video.url}
                                                       
                                                    />
                                                    <span className="z-50 text-start text-red-300 font-extrabold block"> <CiYoutube></CiYoutube> inserer un youtube embed</span>
                                                </label>


                                                <label className=" text-gray-500 rounded mt-5 p-1">
                                                  <input
                                                    type="file"
                                                    accept="video/*"
                                                    key={videoKey} 
                                                    className="hidden"
                                                     
                                                  />
                                                  <div className=" border-dashed border-4 rounded-md p-3 border-gray-200"> 
                                                    <VscDeviceCameraVideo></VscDeviceCameraVideo>  Clicker  selectioner un video
                                                  </div>
                                                  
                                                </label> 
                                              </div>



                                              <div className='w-screen max-w-xl '>
                                                  <div  className='w-full '> 
                                                          { true && (<>  
                                                                              <iframe src={video.url} allowFullScreen     className='w-full h-44'  >
                                                                              </iframe> 
                                                                              
                                                                    </>)  
                                                          }   
                                                       
                                                          { (!true && !true ) ?
                                                              <div className='bg-black rounded-md p-5 z-40 w-full object-cover object-center opacity-20 h-60 flex items-center'>
                                                                  <div  className="w-8 h-8 border-4 border-gray-200 border-dashed rounded-full animate-spin m-auto z-40"></div>
                                                              </div> : ""

                                                          }
                                                                          
                                                  </div> 

                                           
                                              </div> 
 








                                     
                                        </div>







                                      </div>
                                      
                                    ))}
                            </div>:""}

                        
                  
                            <div className="grid grid-cols-1 rounded-lg  ">   
                                <div className="flex items-center justify-between">
                                    <span className="text-start text-lg font-extrabold "> Ajouter un video :</span>
                                    <button className="bg-emerald-500 max-h-8  p-1  m-2 flex justify-start items-center text-white rounded-full" onClick={handleAddVideo}>
                                            <VscAdd size = {25}></VscAdd>
                                    </button>
                                  </div>
                                
                                  <div className="">
                                      <div className="bg-gray-100 flex items-center flex-wrap justify-between p-1 rounded-lg mb-1 w-full">
                        
                                          <input
                                          placeholder="Titre"
                                            value={video.title}
                                            className="w-1/2 focus:outline-none bg-gray-200 rounded p-1"
                                            onChange={(e) => handleVideoTitleChange(e.target.value)} // Gestion du changement de titre
                                          />

                                          <div className="bg-gray-300 rounded-full p-1.5 m-1">
                                            {video.offer === 'free' ? (
                                              <span onClick={() => handleVideoOfferChange('paid')} className="flex items-center"> <VscGift  size={16} className='text-green-500 m-0.5' /> free </span>
                                            ) : (
                                            <span onClick={() => handleVideoOfferChange('free')}  className="flex items-center">  <VscLock  size={16} className="text-red-500 m-0.5" /> paid </span>
                                            )}
                                          </div>


                                          <div className="bg-gray-300 rounded-full p-1.5 m-1 w-20">
                                            {video.type === 'exercice' ? (
                                              <span className = "" onClick={() => handleVideoTypeChange('course')}  >Exercice</span>
                                              )  : ( 
                                                <span className = "" onClick={() => handleVideoTypeChange('exercice')}> cour </span>
                                                )}
                                          </div>

                                          <label className="bg-red-200 text-red-500 rounded-full p-1 m-1">
                                            <span className="flex items-center px-1"> <VscFilePdf size={19} className='m-1' /> Attachment </span>
                                            <input
                                              type="File" 
                                              name="" 
                                              key={attachmentKey}
                                              accept = '.pdf' 
                                              className="hidden"
                                              onChange={(e) => handleVideoAttachmentChange(e)}
                                            />
                                          </label>

                                      </div> 
                                          
                                      <div className="bg-gray-100 flex items-center flex-wrap justify-between p-1 rounded-lg mb-1 w-full">
                                        
                                                      <div className="m-1">
                                                        
                                                        {embedYoutube ? <span onClick ={()=>{setEmbedYoutube(false)}}  className="flex items-center m-0.5 bg-gray-200 rounded-full p-0.5 px-1"> <VscDeviceCameraVideo className = 'text-gray-700  m-1  rounded-full' size = {25} >

                                                        </VscDeviceCameraVideo> Video </span> :  <span onClick ={()=>{setEmbedYoutube(true)}}  className="flex items-center m-0.5 bg-gray-200 rounded-full p-0.5 px-1">  <CiYoutube  className = 'text-red-700    bg-red-100' size = {25}></CiYoutube> Youtube embed</span> }
                                                      </div>  
                                                      {embedYoutube ?<label className=" border-dashed border-4  border-gray-200 bg-gray-100 flex flex-wrap text-gray-500 rounded mt-3 p-1">
                                                          <textarea
                                                            type="text"
                                                            
                                                            className="w-full bg-slate-100 rounded-md focus:outline-none"
                                                            value = {video.url}
                                                            onChange={(e) => handleVideoUrlChange(e.target.value)}
                                                          />
                                                          <span className="z-50 text-start text-red-300 font-extrabold block"> <CiYoutube></CiYoutube> inserer un youtube embed</span>
                                                      </label>
                                                      : <label className=" text-gray-500 rounded mt-5 p-1">
                                                        <input
                                                          type="file"
                                                          accept="video/*"
                                                          key={videoKey}

                                                          className="hidden"
                                                          onChange={(e) => handleVideoFileChange(e)}
                                                        />
                                                        <div className=" border-dashed border-4 rounded-md p-3 border-gray-200"> 
                                                          <VscDeviceCameraVideo></VscDeviceCameraVideo>  Clicker  selectioner un video
                                                        </div>
                                                        
                                                      </label> }
                                                   
                                      </div>
  

                                  </div>   
                                          
                            </div>              
                    
                    </div>

  

            </div> 
        
        </div>

  ); 

}

export default UpdateCourse;

