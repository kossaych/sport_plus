import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4  w-full ">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <a href="#" className="text-white hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
          </div>
          <div className="mr-4">
            <a href="#" className="text-white hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
          </div>
          <div>
            <a href="#" className="text-white hover:text-pink-600">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
        <p className="text-center mt-4">
          © {new Date().getFullYear()} Educa. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
