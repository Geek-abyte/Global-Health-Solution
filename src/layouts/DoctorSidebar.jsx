import React from 'react'

const DoctorSidebar = () => {
  return (
    <div className="relative flex flex-col w-64 h-screen bg-primary-6 rounded-r-md text-white overflow-hidden">
    <div className="image flex items-center px-6 w-full py-[30px]">
      <img src={userImage} alt="" className='w-[70px]'/>
    </div>
    <div className="flex flex-col flex-1 overflow-y-auto">
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'dashboard' ? 'text-secondary-6' : ''
        }`}
      >
       <LuLayoutDashboard className='mr-2'/>
      </Link>
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'profile' ? 'text-secondary-6' : ''
        }`}
      >
       <LuUser className='mr-2'/> Profile
      </Link>
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'Ai' ? 'text-secondary-6' : ''
        }`}
      >
       <HiChip className='mr-2'/> AI
      </Link>   
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'specialist' ? 'text-secondary-6' : ''
        }`}
      >
       <FaUserDoctor className='mr-2'/> Specialist
      </Link>   
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'prescription' ? 'text-secondary-6' : ''
        }`}
      >
       <BsCapsulePill className='mr-2'/> Prescription
      </Link> 
      <Link
        to={"#"}
        className={`px-6 py-3 text-[20px] font-medium flex flex-row justify-start items-center ${
          selectedItem === 'medical-history' ? 'text-secondary-6' : ''
        }`}
      >
       <FaRegHospital className='mr-2'/> Medical History
      </Link> 
    </div>
    <div className="absolute bottom-2 flex items-center justify-center h-16 pb-5 px-[20px] w-full">
      <img src={logoDark} alt="" className='w-[100px]'/>
    </div>
  </div>
  )
}

export default DoctorSidebar