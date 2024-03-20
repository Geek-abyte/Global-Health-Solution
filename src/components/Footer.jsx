import React from 'react'
import { Link } from 'react-router-dom'
import { logoDark } from '../assets'

const Footer = () => {
  return (
    <footer className='bg-primary-6 flex md:flex-row gap-x-[90px] justify-between items-between text-white pr-[200px] px-[100px] p-[40px] pb-[90px]'>
      <img src={logoDark} alt=""className='w-[300px]' />
      <div className='flex md:flex-row gap-[100px]'>
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
              <li>Return Policy</li>
            </Link>
            <Link>
              <li>Cookie Policy</li>
            </Link>
            <Link>
              <li>Privacy Policy</li>
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer