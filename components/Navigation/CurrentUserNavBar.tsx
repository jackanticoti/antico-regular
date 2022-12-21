import React from 'react';
import { useState } from 'react';
import Logo from '../Logo/Logo';
import dropDownClosed from '../Assets/dropDownClosed';
import dropDownOpen from '../Assets/dropDownOpen';
import Avatar from '../Avatar/Avatar';

export default function CurrentUserNavBar() {
  const [navbar, setNavbar] = useState(false);
  const [menubar, setMenubar] = useState(false);

  return (
  <div className="max-w-screen-xl flex justify-between items-center px-4 md:px-8 mx-auto">
      {/* logo - start*/}
      <a href="/" className="inline-flex items-center text-black-800 text-base font-bold gap-2.5" aria-label="logo">
      <Logo size=""  />
        Regular
      </a>
      {/* logo - end*/}

      {/* nav - start*/}
      <nav className="hidden lg:flex gap-12 2xl:ml-16">
          <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">Programs</a>
          <a href="/catalog" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">Courses</a>
          <a href="#" className="text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-sm font-light transition duration-100">About</a>
      </nav>
      {/* nav - end*/}

      
      <div className="flex sm:border-l border-r divide-x">
      <div className='relative lg:hidden'>
        <a href="#" onClick={() => setMenubar(!menubar)} className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center hover:bg-gray-100 active:bg-gray-200 transition duration-100 gap-1.5">
          <button id="icon" type="submit" className="">
                
                {menubar ? 
                <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center '><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3621_36001)">
                <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9934 12.5542 27.6216 9.25145 25.1851 6.81491C22.7486 4.37837 19.4458 3.00661 16 3V3ZM20.7125 19.2875C20.9003 19.4771 21.0056 19.7332 21.0056 20C21.0056 20.2668 20.9003 20.5229 20.7125 20.7125C20.5214 20.8973 20.2659 21.0006 20 21.0006C19.7341 21.0006 19.4786 20.8973 19.2875 20.7125L16 17.4125L12.7125 20.7125C12.5214 20.8973 12.2659 21.0006 12 21.0006C11.7341 21.0006 11.4786 20.8973 11.2875 20.7125C11.0997 20.5229 10.9944 20.2668 10.9944 20C10.9944 19.7332 11.0997 19.4771 11.2875 19.2875L14.5875 16L11.2875 12.7125C11.128 12.5182 11.0466 12.2715 11.0589 12.0205C11.0712 11.7694 11.1765 11.5319 11.3542 11.3542C11.532 11.1765 11.7694 11.0712 12.0205 11.0589C12.2715 11.0465 12.5182 11.128 12.7125 11.2875L16 14.5875L19.2875 11.2875C19.4818 11.128 19.7285 11.0465 19.9795 11.0589C20.2306 11.0712 20.4681 11.1765 20.6458 11.3542C20.8235 11.5319 20.9288 11.7694 20.9411 12.0205C20.9535 12.2715 20.872 12.5182 20.7125 12.7125L17.4125 16L20.7125 19.2875Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_3621_36001">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
                </svg>
                <span className="hidden sm:block text-gray-500 text-xs font-light">Close</span>
                </div> : <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
                    <path  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                  </svg>
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
        
      <div className='relative '>
        <a href="#" onClick={() => setNavbar(!navbar)} className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center hover:bg-gray-100 active:bg-gray-200 transition duration-100 gap-1.5">
          <button id="icon" type="submit" className="">
                
                {navbar ? 
                <div className='w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex flex-col justify-center items-center '><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_3621_36001)">
                <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9934 12.5542 27.6216 9.25145 25.1851 6.81491C22.7486 4.37837 19.4458 3.00661 16 3V3ZM20.7125 19.2875C20.9003 19.4771 21.0056 19.7332 21.0056 20C21.0056 20.2668 20.9003 20.5229 20.7125 20.7125C20.5214 20.8973 20.2659 21.0006 20 21.0006C19.7341 21.0006 19.4786 20.8973 19.2875 20.7125L16 17.4125L12.7125 20.7125C12.5214 20.8973 12.2659 21.0006 12 21.0006C11.7341 21.0006 11.4786 20.8973 11.2875 20.7125C11.0997 20.5229 10.9944 20.2668 10.9944 20C10.9944 19.7332 11.0997 19.4771 11.2875 19.2875L14.5875 16L11.2875 12.7125C11.128 12.5182 11.0466 12.2715 11.0589 12.0205C11.0712 11.7694 11.1765 11.5319 11.3542 11.3542C11.532 11.1765 11.7694 11.0712 12.0205 11.0589C12.2715 11.0465 12.5182 11.128 12.7125 11.2875L16 14.5875L19.2875 11.2875C19.4818 11.128 19.7285 11.0465 19.9795 11.0589C20.2306 11.0712 20.4681 11.1765 20.6458 11.3542C20.8235 11.5319 20.9288 11.7694 20.9411 12.0205C20.9535 12.2715 20.872 12.5182 20.7125 12.7125L17.4125 16L20.7125 19.2875Z" fill="black"/>
                </g>
                <defs>
                <clipPath id="clip0_3621_36001">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
                </svg>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>

          <span className="hidden sm:block text-gray-500 text-xs font-light">Cart</span>
        </a>
        



     
      </div>
     


 
    
  </div>
  );
}
