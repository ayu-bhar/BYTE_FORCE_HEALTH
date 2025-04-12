import React from 'react'
import './hospital.css'
const Bloodbank = ({data, imgUrl})=> {
  return (
    <div className='container'>
      <img src={imgUrl} alt='bloodbank' />
      <div className='bloodbankDashboard'>
      <div className='BloodbankName'>
        <div className="placeHolder">Click here</div>
          {data.website ? (
            <a
              href={data.website}
              target='_blank'
              rel='noopener noreferrer'
              className='bloodbank-link'
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

export default Bloodbank
