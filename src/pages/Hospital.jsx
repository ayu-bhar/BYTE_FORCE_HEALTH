import React from 'react'
import './hospital.css'
const Hospital = ({data, imgUrl})=> {
  return (
    <div className='container'>
      <img src={imgUrl} alt='hospital' />
      <div className='hospitalDashboard'>
      <div className='HospitalName'>
        <div className="placeHolder">Click here</div>
          {data.website ? (
            <a
              href={data.website}
              target='_blank'
              rel='noopener noreferrer'
              className='hospital-link'
            >
              {data.name}
            </a>
          ) : (
            <span>{data.name}</span>
          )}
        </div>
        <div className='Address'>{data.vicinity}</div>
        <div className='active-status'>
          {data.opening_hours?.open_now ? 'Open Now' : 'Closed'}
        </div>
      </div>
    </div>
  )
}

export default Hospital
