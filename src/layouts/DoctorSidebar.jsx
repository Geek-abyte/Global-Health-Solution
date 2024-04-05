import React, { useEffect, useState } from 'react'
import { userImage } from '../assets'
import { Link, useLocation } from 'react-router-dom'
import { LuLayoutDashboard, LuUser } from 'react-icons/lu'
import { HiChip } from 'react-icons/hi'
import { PATH } from '../routes/path'

const DoctorSidebar = ({ className }) => {
  const location = useLocation()
  const [selectedItem, setSelectedItem] = useState('dashboard');

  useEffect(() => {
    switch (location.pathname) {
      case (PATH.doctor.calender):
        setSelectedItem("calender");
        break;
      case (PATH.dashboard.history):
        setSelectedItem("medical-history");
        break;
      default:
        setSelectedItem("dashboard");
        break;
    }
  }, [location.pathname])

  return (
    <nav className={`${className} relative flex flex-col w-20 h-screen bg-primary-10 text-white overflow-hidden`}>
      <div className="image flex items-center px-4 w-full py-[30px]">
        <img src={userImage} alt="" className='w-[70px]'/>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto items-center">
        <Link
          to={"#"}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === 'dashboard' ? 'text-[#FFE500]' : ''
          }`}
        >
          <LuLayoutDashboard size={25} className='mr-2'/>
        </Link>
        <Link
          to={"#"}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === 'profile' ? 'text-[#FFE500]' : ''
          }`}
        >
          <LuUser size={25} className='mr-2'/>
        </Link>
        <Link
          to={"#"}
          className={`px-4 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
            selectedItem === 'Ai' ? 'text-[#FFE500]' : ''
          }`}
        >
          <HiChip size={25} className='mr-2'/>
        </Link>   
      </div>
    </nav>
  )
}

export default DoctorSidebar