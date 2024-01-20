'use client'
import { CiBank, CiBitcoin, CiCoinInsert, CiCoins1, CiGlobe, CiHome,  CiMoneyBill,  CiMountain1,  CiWallet} from 'react-icons/ci'
import {CiLogout} from 'react-icons/ci'
import {VscAccount} from 'react-icons/vsc'
import Link from 'next/link';
import logo from './Logo.jpg'
import { redirect } from 'next/dist/server/api-utils';
const Header = () => {
  function logout(){
    localStorage.setItem('token','')
    window.location = '/'
    
   }
 
 
  return (
          <div className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between h-14  py-10 px-5 lg:px-8"> 
              <div className="">
                <Link href="/" className='flex justify-center flex-wrap items-center'>
                  
                  <img  src={logo.src} width='120px' className = 'rounded-full' alt="logo" />
                  <span className="text-end">Educa</span>
                </Link>
                
                  
              </div>      
              <div className="flex justify-between ">

             
             
                  
                    <Link  className="ml-5 text-sm font-semibold leading-6 text-gray-900"  href='/' ><CiHome size={25}></CiHome>Home</Link>
                    <Link href="#" className="ml-5 text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                        <CiCoinInsert size={25} /> offes
                    </Link> 
                    <Link href="#" className="ml-5 text-sm font-semibold leading-6 hidden text-gray-900">
                          <CiWallet size={25} /> wallet
                    </Link>
                  
                    <Link href="/profile" className="ml-5 text-sm font-semibold leading-6 text-gray-900">
                       <VscAccount size = {25} className='text-sm text-gray-600'/> Profile 
                    </Link>
                
                    <Link href="#"  className="ml-5 text-sm font-semibold leading-6 text-gray-900" onClick={logout}>
                        <CiLogout size={25} /> logout
                    </Link> 
                     
                    
                   

               </div> 
            </nav>     
          </div>
      
    )

};

export default Header;
