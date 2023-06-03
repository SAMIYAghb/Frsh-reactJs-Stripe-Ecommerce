import React from 'react'
// import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = ({useData,setUseData}) => {
  let navigate =useNavigate();

  function logOut() {
    localStorage.removeItem('userToken')
    setUseData(null);
    navigate('/login');
  }
  return <>
    <Navbar useData={useData} logOut={logOut}/>
    <div className="container py-5">
      <Outlet></Outlet>
    </div>
    <Footer/>
    </>
  
}

export default Layout