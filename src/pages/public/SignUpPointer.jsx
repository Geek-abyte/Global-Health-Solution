import React from 'react'
import { Link } from 'react-router-dom'
import PatientSignUp from './PatientSignUp'
import { PATH } from '../../routes/path'

const SignUpPointer = () => {
  return (
    <main>
      <div className='wrapper relative md:w-max mx-auto py-[150px] flex flex-row justify-center items-center space-x-[100px]'>

        <Link to={PATH.general.doctorSignUp}>
          <div className='clickbox h-[300px] w-[300px] flex justify-center items-center text-justify border-4 cursor-pointer border-primary-6 rounded-2xl text-primary-5 text-[20px] font-bold transform transition-transform hover:scale-105'>
            I am a Doctor
          </div>
        </Link>

        <Link to={PATH.general.signUp}>
          <div className='clickbox h-[300px] w-[300px] flex justify-center items-center text-justify border-4 cursor-pointer border-primary-6 rounded-2xl text-primary-5 text-[20px] font-bold transform transition-transform hover:scale-105'>
            I am a Patient
          </div>
        </Link>

      </div>
    </main>
  )
}

export default SignUpPointer