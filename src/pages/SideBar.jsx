import React, { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import { Link } from 'react-router-dom'

const SideBar = () => {
    const {apiData,loading}=useContext(DataContext)
  return (
    <div className='w-full max-w-5xl px-6 items-start pl-3'>
        {/*Latest Blog */}
        <h1 className='font-bold text-xl w-full border-b-1 border-b-gray-500 mb-2'>Latest Blog</h1>
      <div className='flex flex-col gap-3'>
         {

          apiData.length>0 && (
              apiData.slice(0,5).map((item,index)=>(
             <div className='border-b-1 border-b-gray-500' key={item.id}>
               <h1 className='font-semibold text-gray-800'>{item.title}</h1>
               <Link to={`/details/${item.id}`}>
                <button className='p-1.5 text-sm text-blue-500 font-semibold cursor-pointer hover:text-blue-400'>
                Read More → 
              </button>
               </Link>            
             
             </div>
             
           ))
          )
         }
      </div>

       {/*Popular Blog */}
       <h1 className='font-bold text-xl pt-5 w-full truncate border-b-1 border-b-gray-500 mb-2'>Popular Blog</h1>
       <div className='flex flex-col gap-3'>
        {
            apiData.length>0 && (
              apiData.slice(5,10).map((item,index)=>(
                <div className='border-b-1 border-b-gray-500' key={item.id}>
               <h1 className='font-semibold text-gray-800'>{item.title}</h1>
               <Link to={`/details/${item.id}`}>
                <button className='p-1.5 text-sm  text-blue-500 font-semibold cursor-pointer hover:text-blue-400'>
                Read More → 
              </button>
               </Link>            
             
             </div>
            ))
            )
        }
       </div>
    </div>
  )
}

export default SideBar
