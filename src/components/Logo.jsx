import React from 'react'
import Logo2 from '../assets/Logo2.jpg'

function Logo({width='100px'}) {
  return (
    <div>
      <img src={Logo2} className='w-[60px] rounded'/>
    </div>
  )
}

export default Logo
