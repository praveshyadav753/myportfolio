import React from 'react'
import Name from './Nameanimation'
import HeroSection from './HeroImage'
function Section1() {
  return (
    <div id='home' className='w-full  h-full grid md:grid-cols-[2fr_1fr] place-items-center'>
        <Name/>
        <div className="absolute z-0 scale-60">
        {/* <HeroSection/> */}
        </div>
    </div>
  )
}

export default Section1