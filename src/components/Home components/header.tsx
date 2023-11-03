'use client'
import React from 'react';
import {CiWallet} from 'react-icons/ci'
import {CiLogout} from 'react-icons/ci'
import {VscAccount} from 'react-icons/vsc'
import Link from 'next/link';

const Header = () => {
  function logout(){
    localStorage.removeItem('token');
    window.location.reload();
    window.location.href='/'
}
    return (
      <div className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Educa</span>
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
          </Link>
        </div>
     
        <div className="flex justify-between ">
  
          <Link href="#" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
  
                 <CiWallet size={25} /> wallet
  
              </Link>
        
          <Link href="/profile" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
          <VscAccount size = {25}/> Profile
          </Link>
      
            <Link href="#" className="ml-5 text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
               <CiLogout size={25} /> logout
          </Link> 
          
        </div>
      </nav>     
    </div>
    
    )

};

export default Header;
