import { doctors2 } from '../../assets'
import { SignInForm } from '../../components'

const SignIn = () => {
  return (
    <main>
        <div className="wrapper relative py-[100px] pb-[200px] mx-auto md:w-max flex md:flex-row gap-x-[100px]">
          <div className='right flex-1 flex flex-col md:block hidden'>
            <img src={doctors2} alt="image of doctors" />
          </div>
          <div className='md:left flex-1 flex justify-center items-center p-[20px]'>
            <SignInForm />
          </div>
        </div>
      </main>
  )
}

export default SignIn