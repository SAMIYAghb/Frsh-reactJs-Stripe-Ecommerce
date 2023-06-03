import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = ({saveUseData}) => {
  let navigate = useNavigate ();
  const [isloading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);


  async function handleLogin(values){
    // console.log(values);
    setIsLoading(true);
    setMessageError(null);

      let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((err)=>{

        // console.log(err);

        setIsLoading(false);
        // setMessageError(err.response.data.errors.msg)
        setMessageError(err.response.data.message)
      })
    
    // console.log(data, 'from login');

      if(data.message === 'success'){
        
        localStorage.setItem('userToken', data.token);
        saveUseData();
        setIsLoading(false);

        //navigate to home page
        navigate('/')
      }
  
  }
 
    let validationSchema = Yup.object({
      
      email: Yup.string()
        .email()
        .required('Adress email is required'),

      password: Yup.string()
        .required('Password is required')
        .matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with upper case letter,contains 5-10 characters and numbers'),
        
    })

    let formik = useFormik({
      initialValues: {
        email: '',
        password: '',

      },
    validationSchema,
    onSubmit: handleLogin
  });
  // console.log(formik);

  return (
    <>
    <div className="w-75 mx-auto py-5">
      <h2 className='h3 title my-5'>Login Now: </h2>
      <form action="" onSubmit={formik.handleSubmit}>
        
          <label htmlFor="email">Email Address :</label>
          <input className='form-control my-2'
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
         <div className='alert alert-danger'>{formik.errors.email}</div>
       ) : null}

          <label htmlFor="password">Password :</label>
          <input className='form-control my-2'
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
         <div className='alert alert-danger'>{formik.errors.password}</div>
       ) : null}

         

        {isloading 
          ? (<button
             className='btn bg-main text-white my-3'>
              <i className='fas fa-spinner fa-spin'></i></button>) 
              
          : (<button
                disabled={! (formik.isValid && formik.dirty)}
                 className='btn bg-main text-white my-3'
            type="submit">Login</button>)}
            
            
      {messageError ? (<div className="alert alert-danger">{messageError}</div>): null }
            
          
      </form>
    </div></>
  )
}

export default Login