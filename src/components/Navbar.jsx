import React from 'react'

const Navbar = () => {
  return (
   <div className="navbar h-[50px] bg-blue-900 text-white">
    <nav className='flex justify-around items-center gap-11 h-full'>
      <p className='font-extrabold font-mono text-[21px] cursor-pointer'>iTask</p>
      <div className="list-none flex gap-11 font-mono text-[18px]">
        <li className='cursor-pointer hover:scale-105 transition-all '>Home</li>
        <li className='cursor-pointer hover:scale-105 transition-all '>Tasks</li>
      </div>
    </nav>
   </div>
  )
}

export default Navbar