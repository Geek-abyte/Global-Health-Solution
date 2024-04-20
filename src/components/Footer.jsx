import React from 'react'
import { Link } from 'react-router-dom'
import { logoDark } from '../assets'

const Footer = () => {
  return (
    <footer className='bg-primary-6 flex flex-col gap-x-[90px] justify-between items-between text-white md:pr-[200px] md:px-[100px] p-[40px] md:pb-[90px]'>
      <div className='flex flex-col md:flex-row gap-8 md:gap-[100px]'>
      <img src={logoDark} alt="" className='hidden md:block w-[300px]' />

        <div className='flex flex-col gap-y-[5px]'>
          <h4 className='font-extrabold text-[24px]'>The Platform</h4>
          <ul>
            <Link className>
              <li>Log in</li>
            </Link>
            <Link>
              <li>sign up</li>
            </Link>
            <Link>
              <li>Term of Use</li>
            </Link>
          </ul>
        </div>
        <div className='flex flex-col gap-y-[5px]'>
          <h4 className='font-extrabold text-[24px]'>Company</h4>
          <ul>
            <Link>
              <li>Blog</li>
            </Link>
            <Link>
              <li>About Us</li>
            </Link>
            <Link>
              <li>Contact Us</li>
            </Link>
          </ul>
        </div>
        <div className='flex flex-col gap-y-[5px]'>
          <h4 className='font-extrabold text-[24px]'>Legal</h4>
          <ul>
            <Link>
              <li>Cookie Policy</li>
            </Link>
            <Link>
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>
      </div>
      <div className='border-t mt-8 pt-4'>
        copyright something
      </div>
    </footer>
  )
}

export default Footer