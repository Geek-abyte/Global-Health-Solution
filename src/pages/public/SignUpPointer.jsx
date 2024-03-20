import React from 'react'

const SignUpPointer = () => {
  return (
    <main>
      <div className='wrapper relative md:w-max mx-auto py-[150px] flex flex-row justify-center items-center space-x-[100px]'>

        <div className='clickbox h-[300px] w-[300px] flex justify-center items-center text-justify border-4 cursor-pointer border-primary-6 rounded-2xl text-primary-5 text-[20px] font-bold transform transition-transform hover:scale-105'>
          I am a Doctor
        </div>

        <div className='clickbox h-[300px] w-[300px] flex justify-center items-center text-justify border-4 cursor-pointer border-primary-6 rounded-2xl text-primary-5 text-[20px] font-bold transform transition-transform hover:scale-105'>
          I am a Patient
        </div>

      </div>
    </main>
  )
}

export default SignUpPointer