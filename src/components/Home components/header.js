'use client'
import React from 'react';
import {CiBookmark, CiBoxList, CiChat1, CiCircleInfo, CiFacebook, CiHome, CiLogin, CiPen, CiSignpostDuo1, CiWallet} from 'react-icons/ci'
import {CiLogout} from 'react-icons/ci'
import {VscAccount, VscSignIn} from 'react-icons/vsc'
import Link from 'next/link';
import { FaBook, FaCashRegister, FaFacebookMessenger, FaList, FaRegistered } from 'react-icons/fa';

const Header = () => {
  function logout(){
    localStorage.removeItem('token');
    window.location.reload();
    window.location.href='/'
  }
  var logedIn = true
  if(localStorage.getItem('token')){
     logedIn = true
  }else{
     logedIn = false
  }
  return (
          <div className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between h-14  py-10 px-5 lg:px-8">
            
            
              <div className="">
                <Link href="/" >
                  
                  <img className="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""></img>
                  <span className="">Educa</span>
                </Link>
                
                  
              </div>

              
              
              <div className="flex justify-between ">

             
             
                  {logedIn ?<>
                    <Link  className="ml-5 text-sm font-semibold leading-6 text-gray-900"  href='/' ><CiHome size={25}></CiHome>Home</Link>

                    <Link href="#" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
            
                          <CiWallet size={25} /> wallet
            
                        </Link>
                  
                    <Link href="/profile" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
                    <VscAccount size = {25}/> Profile
                    </Link>
                
                      <Link href="#" className="ml-5 text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                        <CiLogout size={25} /> logout
                    </Link> 
                    
                  </>

                  :< >
            

                  <Link href="/register" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
                    <CiBookmark size = {25}/> SignUp
                  </Link>

                  <Link href="/login" className="ml-5 text-sm font-semibold leading-6 text-gray-900" >
                      <CiLogin size={25} /> login
                  </Link> 
                  
                  </>}

               </div>




            </nav>     
          </div>
      
    )

};

export default Header;
