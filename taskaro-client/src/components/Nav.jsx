import React from 'react'
import { Sun,Moon } from "lucide-react";
import { useTheme } from '../context/Theme-Provider';
import { useState } from 'react';
const Nav = () => {
   const {theme,setTheme }=useTheme();
      const isDark = theme ==='dark'
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur px-5 h-[60px] flex items-center justify-between shadow-md'>
      <h1 className='text-2xl font-bold tracking-tight lg:text-3xl'> <span className='text-[#7638f8]'>TasK</span>aro</h1>
      <div className={`cursor-pointer transition-transform duration-500 ${isDark?'rotate-180':'rotate-0'}`} onClick={()=>isDark?setTheme('light'):setTheme('dark')}>
                      {isDark?<Sun className="h-6 w-6 text-yellow-500"/>
                      :
                      <Moon className="h-6 w-6 text-blue-500"/>}
      
                  </div>
    </header>
  )
}

export default Nav
