import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Register = () => {
  let navigate = useNavigate ();
  const [isloading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState(null);


  async function handleRegister(values){
    // console.log(values);
    setIsLoading(true);
    setMessageError(null);

      let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((err)=>{

        console.log(err);

        setIsLoading(false);
        // setMessageError(err.response.data.errors.msg)
        setMessageError(err.response.data.message)
      })
    
    console.log(data);

      if(data.message === 'success'){

        setIsLoading(false);

        //navigate to login page
        navigate('/login')
        setMessageError('')
      }

  
    // setMessageError(`${err.response.data.errors.param} : ${err.response.data.errors.msg}`)
      
  }
 
    let validationSchema = Yup.object({
      name: Yup.string()
        .min(4,  'Name minlength is 4')
        .max(15, 'Must be 15 characters or less')
        .required('Name is required'),

      email: Yup.string()
        .email()
        .required('Adress email is required'),

      password: Yup.string()
        // .min(5,  'Password minlength is 5')
        // .max(10, 'Must be 10 characters or less')
        .required('Password is required')
        .matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with upper case letter,contains 5-10 characters and numbers'),
        
      rePassword: Yup.string()
        // .min(5)
        // .max(15, 'Must be 15 characters or less')
        .required('Re-password is required')
        .oneOf([Yup.ref('password')], 'Password and re-password doesnt match'),

      phone: Yup.string()
        // .min(5)
        // .max(15, 'Must be 15 characters or less')
        .required('phone is required')
        .matches(/^01[0125][0-9]{8}$/,'Phone must be like 0123 456 7899'),

    })

    let formik = useFormik({
      initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone:'',
      },
    validationSchema,
    onSubmit: handleRegister
  });
  // console.log(formik);

  return (
    <>
    <div className="w-75 mx-auto py-5">
      <h2 className='my-5 h3 title'>Register Now: </h2>
      <form action="" onSubmit={formik.handleSubmit}>
          <label htmlFor="name">First Name :</label>
          <input className='form-control my-2'
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name ? (
         <div className='alert alert-danger'>{formik.errors.name}</div>
       ) : null}

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

          <label htmlFor="rePassword">RePassword :</label>
          <input className='form-control my-2'
            id="rePassword"
            name="rePassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
          />
          {formik.touched.rePassword && formik.errors.rePassword ? (
         <div  className='alert alert-danger'>{formik.errors.rePassword}</div>
       ) : null}

       <label htmlFor="rePassword">Phone :</label>
          <input className='form-control my-2'
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            placeholder='01234567899'
          />
          {formik.touched.phone && formik.errors.phone ? (
         <div  className='alert alert-danger'>{formik.errors.phone}</div>
       ) : null}

        {isloading 
          ? (<button
             className='btn bg-main text-white my-3'>
              <i className='fas fa-spinner fa-spin'></i></button>) 
              
          : (<button
                disabled={! (formik.isValid && formik.dirty)}
                 className='btn bg-main text-white my-3'
            type="submit">Register</button>)}
            
            
      {messageError ? (<div className="alert alert-danger">{messageError}</div>): null }
            
          
      </form>
    </div></>
  )
}

export default Register