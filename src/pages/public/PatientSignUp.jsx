import React from 'react'
import { doctors, logoWhite } from '../../assets'
import { SignUpForm } from '../../components'

const PatientSignUp = () => {
  return (
      <main className={`relative mx-auto md:w-max flex md:flex-row py-[100px] gap-x-[100px] pb-[200px]`}>
        <div className='right flex-1 flex flex-col justify-center items-center'>
          <img src={doctors} alt="image of doctors" />
        </div>
        <div className='left flex flex-1 justify-center items-center'>
          <SignUpForm />
        </div>
      </main>
  )
}

export default PatientSignUp