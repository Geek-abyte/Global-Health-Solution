import React from 'react'
import { userImage } from '../../../assets'
import { Button } from '../../../components'
import { IoLocationOutline } from "react-icons/io5";
import { LuMail, LuPhoneCall } from 'react-icons/lu';

const patientProfile = ({ className }) => {
  return (
    <main className={`main p-[40px] w-full ${className}`}>
      <div className="top">
        <div className="card flex flex-row bg-primary-1 shadow-lg rounded-lg p-[20px]">
          <div className="right flex flex-row gap-[20px] p-[20px]">
            <img className="border-4 rounded-full w-[100px] border-white" src={userImage} alt="" />
            <div className='flex justify-center items-start flex-col'>
              <p className='font-bold text-[25px]'>West Brown</p>
              <div className="gender font-semibold">male</div>
              <Button
                background="bg-primary-6"
                borderRadius='rounded-full'
              >
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="left border-l-2 border-primary-2 font-bold text-[18px] text-primary-7 flex flex-row gap-[20px] p-[20px] justify-center items-center">
            <div className="location flex flex-row gap-2 justify-center items-center"><IoLocationOutline />Liverpool, England</div>
            <div className="number flex flex-row gap-2 justify-center items-center"><LuPhoneCall />+44 345 678 85</div>
            <div className="email flex flex-row gap-2 justify-center items-center"><LuMail />westbrown@mail.com</div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default patientProfile