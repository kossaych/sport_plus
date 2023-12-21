import React from 'react';
import Link from 'next/link';

const RegistrationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Choose Registration Type</h1>
      <div className="flex flex-col gap-4">
        <Link
            href ="/register_teacher"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-xl shadow-md transition duration-300 ease-in-out"
        >
          Teacher Registration
        </Link>
        <Link
          href="/register_parent"
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-xl shadow-md transition duration-300 ease-in-out"
        >
          Parent Registration
        </Link>
        <Link
          href="/register_student"
          className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-xl shadow-md transition duration-300 ease-in-out"
        >
          Student Registration
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
