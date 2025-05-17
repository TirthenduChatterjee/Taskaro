import React from 'react'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
import { Toaster } from './ui/sonner'
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import SideBar from './SideBar';
import { useState } from 'react';
const Layout = () => {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className=' w-full  bg-gradient-to-br from-background to-card min-h-screen'>
      <Nav />
      <div className='flex justify-center'>
        <div className="flex flex-col h-[91.5vh] container pt-4 pb-3 gap-6">
          {/* Hamburger for small/medium screens */}
          <div className="lg:hidden">
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[250px] p-4">
                <div className="space-y-4 ">
                  <SideBar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex lg:flex-row gap-6 h-full">
            <div className="hidden lg:block w-[250px] bg-gradient-to-t from-background to-card rounded-xl p-4 space-y-4 h-full">
              <SideBar />
            </div>

            <Outlet />
          </div>
        </div>
      </div>
      <Toaster />
    </div>

  )
}

export default Layout