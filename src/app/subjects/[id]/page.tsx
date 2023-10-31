import Link from "next/link";
import { title } from "process";
import React from 'react';

const Subject = (props) => {
  const subject  = props.params.id
  return (
    <>
    <div className="bg-white transition-d border-l-4  shadow-md rounded-xl border-blue-500 p-4 m-3 max-w-md">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">{props.params.id} subject</h2>
      </div>
      <div className="my-progress-list">
    
            <div className="flex items-center">
             
             
              <div className="mr-4">
                <img
                  src={subject.imageUrl}
                  alt={subject.title}
                  className="w-12 h-12"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{subject.title}</span>
                <div className="flex items-center mt-2">
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
          
      
      </div><br></br>
      <div>test</div>
    </div>
    <div className="bg-white transition-d shadow-md rounded-xl border-blue-500 p-4 m-3 ">
    <h2 className="text-2xl font-semibold">chapiters</h2>

    </div>

    </>
  );
};

export default Subject;
