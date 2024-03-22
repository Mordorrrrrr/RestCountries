import React from 'react'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className='text-7xl flex justify-center items-center h-full flex-col'> Page Not Found. Sorry 😢 <span className='h-40'>You Can Go Back To <Link to='/' className=' text-green-500'>Home Page</Link></span></div>
  )
}
