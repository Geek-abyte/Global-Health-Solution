import React from 'react'
import Loader from '../../../components/Loader'

const ChatRoom = () => {
  return (
    <div className='flex items-center justify-center flex-col'>
      <Loader />
      connecting to a doctor...
    </div>
  )
}

export default ChatRoom