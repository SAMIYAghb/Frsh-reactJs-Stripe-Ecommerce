import React from 'react'
// import styles from './ProtectedRoute.module.css';
import {Navigate } from 'react-router-dom';


export default function ProtectedRoute(props){
  // console.log(props.children)


  if(localStorage.getItem('userToken') == null) 
  {
      //navigate to Login
      return <Navigate to={'/login'}/>
  }else{
    //navigate to the componant asked (demandé)
    return props.children; 
  }
  
}



{/* <ProtectedRoute>
  console.log(props.children)=>Home
  <Home/>
 
</ProtectedRoute> */}