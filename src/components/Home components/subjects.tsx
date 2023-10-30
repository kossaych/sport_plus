import Link from 'next/link';
import React from 'react';

const Subject = () => {
  const subjects = [
    {
      id: 1,
      title: 'STI',
      imageUrl: 'https://ta-storage.s3.amazonaws.com/prod/1630324825_MicrosoftTeams-image%20-%202021-08-30T123137.566.png',
      progress: 50,
    },
    {
      id: 2,
      title: 'Programmation',
      imageUrl: 'https://ta-storage.s3.amazonaws.com/prod/1626533216_1612949783_programmation.svg',
      progress: 60,
    },


  ];

  return (
    <div className="bg-white shadow-md rounded p-4 my-4">
      <div className="mb-4">
        <Link href={"/subjects"}><h2 className="text-2xl font-semibold">Subjects</h2></Link>
      </div>
      <div className="my-progress-list">
        {subjects.map((subject) => (
          <Link className="my-progress-item" href={`/subjects/${subject.id}`} key={subject.id}>
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
          </Link>
        ))}
      </div>
    </div>
 
  );
};

export default Subject;
