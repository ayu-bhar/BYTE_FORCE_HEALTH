import React from 'react'
import './hospital.css'
const Hospital = ({data, imgUrl})=> {
  return (
    <div className='container'>
      <img src={imgUrl} alt='hospital' />
      <div className='hospitalDashboard'>
        <div className='HospitalName'>{data.name}</div>
        <div className='Address'>{data.vicinity}</div>
        <div className='active-status'>
          {data.opening_hours?.open_now ? 'Open Now' : 'Closed'}
        </div>
      </div>
    </div>
  )
}

export default Hospital
