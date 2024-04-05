import React from 'react'
import { DTable } from '../../../components'
import { cardbrain, carddoc, cardfile } from '../../../assets'

const PatientDashboard = ({ className }) => {
  return (
    <main className={`main p-[40px] w-full ${className}`}>
      <div className='flex flex-row items-center justify-between mb-[90px]'>
        <div className='card flex flex-col gap-[10px] text-[20px] font-bold text-secondary-6 rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg'>
          <img src={cardbrain} className="w-[80px]" alt="" />
          chat with AI
        </div>
        <div className='card flex flex-col gap-[10px] text-[20px] font-bold text-primary-6 rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg'>
          <img src={carddoc} className="w-[80px]" alt="" />
          consultant
        </div>
        <div className='card flex flex-col gap-[10px] text-[20px] font-bold text-[#3AADD9] rounded-md border-2 border-secondary-6 h-[200px] w-[200px] hover:scale-110 transition-transform duration-300 flex items-center justify-center shadow-lg'>
         <img src={cardfile} className="w-[80px]" alt="" />
          History
        </div>
      </div>
      <DTable />
    </main>
  )
}

export default PatientDashboard