import React from 'react'
import { DTable } from '../../../components'
import { tableData } from '../../../data/tableData'

const MedicalHistory = () => {
  return (
    <div className='p-[45px]'>
      <DTable data={tableData}/>
    </div>
  )
}

export default MedicalHistory