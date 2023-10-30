"use client";
import Link from 'next/link';
import React, { useState } from 'react';

function Lives () {
  const todayLiveCourses = [
    {
      title: 'Mathématiques',
      professor: 'M. Dupont',
      time: '10:00 - 11:30',
    },
    {
        title: 'Mathématiques',
        professor: 'M. Dupont',
        time: '10:00 - 11:30',
    },
    {
        title: 'Mathématiques',
        professor: 'M. Dupont',
        time: '10:00 - 11:30',
    },
    {
      title: 'Histoire',
      professor: 'Mme. Martin',
      time: '13:00 - 14:30',
    },
    {
      title: 'Sciences',
      professor: 'M. Smith',
      time: '15:00 - 16:30',
    },
    // Ajoutez davantage de cours ici si nécessaire
  ];
  const [showMore, setShowMore] = useState(false);
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const displayedCourses = showMore ? todayLiveCourses : todayLiveCourses.slice(0, 3);

  return (
    <div className="container mx-auto p-4 ">
      <div className='flex justify-around'> <span className=''>lives</span> <Link  href="/lives">all  </Link></div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left">Titre du cours</th>
            <th className="text-left">Heure</th>
          </tr>
        </thead>
        <tbody>
          {displayedCourses.map((course, index) => (
            <tr key={index}>
              <td className="border-b ">{course.title}</td>
              <td className="border-b border-gray-200 py-2">{course.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
   
   
   
      {todayLiveCourses.length > 3 && (
        <button
          className="mt-2 text-gray-500 hover:text-black"
          onClick={toggleShowMore}
        >
          {showMore ? 'Afficher moins' : 'Afficher plus'}
        </button>
      )}


    </div>
  );
};

export default Lives;

