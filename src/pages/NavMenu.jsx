import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink,Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import LogoutButton from './../auth/LogoutButton';

const ProfileDropdown=()=>{
  const [open, setOpen] = useState(true);
  const {menu,setMenu,isLoggedIn}=useContext(DataContext)
  const dropdownRef = useRef(null);
  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => {setOpen(!open)}}
        className="inline-flex justify-center w-full rounded-md hover:font-bold shadow-sm px-4 py-2 bg-orange-500 text-sm font-medium mb-2 text-white hover:bg-orange-600 focus:outline-none"
        aria-expanded={open}
        aria-haspopup="true"
      >
        Profile
        <svg
          className="ml-2 -mr-1 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <Link to="blog/create"
              onClick={()=>{setOpen(!open);setMenu(true);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
            >
              Create Blog
            </Link>
            <Link
              to="blog/myblog"
               onClick={()=>{setOpen(!open);setMenu(true);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-200"
            >
              myBlog
            </Link>
            <div
              onClick={()=>{setOpen(!open);setMenu(true);}}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"            
            >          
              <LogoutButton/>         
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}


const NavMenu = () => {
    const {menu,setMenu,isLoggedIn}=useContext(DataContext)
    const list = [
    { item: "Home", url: "/" },
    { item: "Services", url: "services" },
    { item: "About", url: "about" },
    { item: "Blogs", url: "all" },
    { item: "Contact", url: "contact" },
  ];
  return (
    <div>
      <div className='flex flex-col  text-gray-700 text-sm font-extralight'>
        {
          list.map((item,index)=>(            
              <NavLink
              key={index}
              to={item.url}
              onClick={()=>setMenu(true)}
              className={"p-1 px-10 py-2 hover:bg-white cursor-pointer hover:transition text-gray-600 rounded-md font-bold hover:shadow-md"}>
                {item.item}
              </NavLink>                  
          ))
        }
         {!isLoggedIn ? (
            <div>
              <Link to="login" >
              <button onClick={()=>setMenu(true)}  className=" flex ml-8 bg-orange-500 text-white font-semibold cursor-pointer rounded-md hover:bg-orange-400 transition px-4 mb-2 mt-2 py-1 md:hidden">
                Login
              </button>
              </Link>            
              
            </div>
          ) : (
             <div className="flex md:hidden ml-5" >
              <ProfileDropdown/> 
             </div>          
          )}
      </div>
    </div>
  )
}

export default NavMenu
