import React from 'react';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import dropDownClosed from '../Assets/dropDownClosed';
import dropDownOpen from '../Assets/dropDownOpen';
import Avatar from '../Avatar/Avatar';
import { ShoppingBag, XCircle, List } from "phosphor-react";

export default function CurrentUserNavBar() {
  const [navbar, setNavbar] = useState(false);
  const [menubar, setMenubar] = useState(false);

  return (
  <div className="max-w-screen-xl flex justify-between items-center px-4 md:px-8 mx-auto">
      {/* logo - start*/}
      <div className='inline-flex items-center'>
        <Logo size=""/>
        <a href="/" className="text-black-800 text-base font-bold gap-2.5" aria-label="logo">
          Regular
        </a>
      </div>
      {/* logo - end*/}

      {/* nav - start*/}
      <nav className="hidden lg:flex gap-12 2xl:ml-16">
          <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">Programs</a>
          <a href="/catalog" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">Courses</a>
          <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">About</a>
      </nav>
      {/* nav - end*/}

      
      <div className="flex sm:border-l border-r divide-x">
        
        {/* Mobile Menu - start*/}
        <div className='relative lg:hidden'>
          <a href="#" onClick={() => setMenubar(!menubar)} className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center hover:bg-gray-100 active:bg-gray-200 transition duration-100 gap-1.5">
            <button id="icon" type="submit" className="">
                  
                  {menubar ? 
                  <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center '>
                    c

                  <span className="hidden sm:block text-gray-500 text-xs font-light">Close</span>
                  </div> : <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center'>
                    <List size={32}  className=" text-interface-300"/>
                    <span className="hidden sm:block text-gray-500 text-sm font-light">menu</span></div>}
              </button>
            
          </a>
          {/* dropdown menu */}
          <div
            className={`${
              menubar ? 'block' : 'hidden'
            } z-10 absolute right-0 top-10 p-6 mt-16 min-w-fit flex rounded-md shadow-lg bg-white`}
          >
            {/* nav - start*/}
            <nav className="flex flex-col gap-12">
                <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm  font-light transition duration-100">Programs</a>
                <a href="/catalog" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm  font-light transition duration-100">Courses</a>
                <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">About</a>
            </nav>
            {/* nav - end*/}
          </div>
        </div>
        {/* Mobile Menu - end*/}

        <div className='relative '>
          <a href="#" onClick={() => setNavbar(!navbar)} className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center hover:bg-gray-100 active:bg-gray-200 transition duration-100 gap-1.5">
            <button id="icon" type="submit" className="">
                  
                  {navbar ? 
                  <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center '>
                   <XCircle size={32} weight="fill" className=" text-interface-300" /> 
                  <span className="hidden sm:block text-gray-500 text-xs font-light">Close</span>
                  </div> : <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center'><Avatar size="" /><span className="hidden sm:block text-gray-500 text-xs font-light">Account</span></div>}
        
              </button>
            
          </a>
          {/* dropdown menu */}
          <div
            className={`${
              navbar ? 'block' : 'hidden'
            } z-10 absolute right-0 top-0 sm:top-10 p-5 mt-16 w-96 rounded-md shadow-lg bg-white`}
          >
            <div className="">
              <ul className="space-y-2">
                <div className="flex py-5">
                  <Avatar size="small" />
                  <div className="mx-3 my-auto">
                    <button className="hover:text-blue-700">
                      <a href="/learn/profile">Edit My Profile</a>
                    </button>
                  </div>
                </div>
                <hr></hr>
                <a href="/transcript">
                  <li className="md:hover:bg-white hover:bg-slate-100 rounded pl-2 py-2 font-light">
                    My Transcript
                  </li>
                </a>
                <a href="/support">
                  <li className="md:hover:bg-white hover:bg-slate-100 rounded pl-2 pt-2 pb-4 font-light">
                    Need Support?
                  </li>
                </a>
                <hr></hr>
                <a href="/signout">
                  <div className="text-center pt-5 text-sm text-blue-900 hover:text-blue-700 font-light">
                    Sign out
                  </div>
                </a>
              </ul>
            </div>
          </div>
        </div>

        <a href="#" className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center hover:bg-gray-100 active:bg-gray-200 transition duration-100 gap-1.5">
          <ShoppingBag size={32} className=" text-interface-200" />
          <span className="hidden sm:block text-gray-500 text-xs font-light">Cart</span>
        </a>
      </div>
  </div>
  );
}
