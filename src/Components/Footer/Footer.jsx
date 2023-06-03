import React from 'react';
import amazon from './../../assets/images/amazon1.png';
import playstore from './../../assets/images/playstore1.png';

const Footer = () => {
  return (<>
  <div className="footer bg-light py-5">
  <div className="container ">
      <h2 className='h4'> Get the FreshCart app</h2>
        <p>We will send you a link, open it on your phone to downlaod the app</p>
      <div className="row mt-3">
          <div className="col-md-8 mt-3">
            <input type="text" className="form-control" placeholder='Email...'/>
          </div>
          <div className="col-md-4 mt-3">
            <button className="btn bg-main w-100 text-white footer-btn">Share App Link</button>
        </div>
      </div>
       
        
        <div className=" footer-details d-flex justify-content-between align-items-center mt-4">
          <div className="d-flex justify-content-between align-items-center">
          <h5 className=' ftr h6'>Payment Partners</h5>
            <img src={amazon} alt="" className='w-50 fluid' />
            </div>
          <div className=" ftr d-flex justify-content-between align-items-center">
          <h5 className='h6'>Get deliveries with FreshCart</h5>
            <img src={playstore} alt="" className='w-50 fluid' />
            </div>
        </div>
    
        
        </div> 
  </div> 
    </>)
}

export default Footer