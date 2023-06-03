import React from 'react'
import styles from './MainSlider.module.css';
import img from './../../assets/images/homepage.png'

const MainSlider = () => {
  return <>
    
    <div className="pt-5 pb-3">
      <img src={img} alt="" className='w-100 fluid' />
    </div>
    </>
  
}

export default MainSlider