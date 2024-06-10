import React from 'react'
import { doctorsBlue, logoWhite } from '../../assets'
import { SpecialistSignUpForm } from '../../components'

const DoctorSignUP = () => {
  return (
      <main className={`bg-primary-7`}>
        <div className="wrapper relative py-[100px] mx-auto md:w-max flex md:flex-row gap-x-[100px]">
          <div className='right flex-1 flex flex-col'>
            <img src={doctorsBlue} alt="image of doctors" />
          </div>
          <div className='left flex-1 justify-center items-center'>
            <SpecialistSignUpForm />
          </div>
        </div>
      </main>
  )
}

export default DoctorSignUP