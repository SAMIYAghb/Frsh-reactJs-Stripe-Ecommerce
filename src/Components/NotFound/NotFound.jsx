import React from 'react'
import styles from './NotFound.module.css';
import not from './../../assets/images/notFound.png'

const NotFound = () => {
  return <>
    
  <div className="pt-5 pb-3">
    <img src={not} alt="" className='w-100 fluid' />
  </div>
  </>
  
}

export default NotFound