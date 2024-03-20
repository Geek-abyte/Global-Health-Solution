import React from 'react'
import { doctors2 } from '../../assets'
import { SignInForm } from '../../components'

const SignIn = () => {
  return (
    <main>
        <div className="wrapper relative py-[100px] pb-[200px] mx-auto md:w-max flex md:flex-row space-x-5 gap-x-[100px]">
          <div className='right flex-1 flex flex-col'>
            <img src={doctors2} alt="image of doctors" />
          </div>
          <div className='left flex-1 flex justify-center items-center'>
            <SignInForm />
          </div>
        </div>
      </main>
  )
}

export default SignIn