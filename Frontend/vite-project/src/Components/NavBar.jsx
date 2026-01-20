import { HandCoins, UserCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavBar = () => {
  return (
    <>
      <nav className=' flex justify-between items-center ml-16 mr-16 mt-8 p-4'>
        <Link to='/'>
        <h1 className='font-medium text-xl cursor-pointer'>PTodo</h1>
        </Link>
        <div className='flex items-center gap-8 text-sm'>
          <p className='flex items-center gap-1 text-[#7D6E00] cursor-pointer'>Hi! <HandCoins/> Welcome</p>
          <p className='flex items-center gap-1 cursor-pointer'><UserCircle size={16}/> Contact Us</p>
        </div>
      </nav>
    </>
  )
}
