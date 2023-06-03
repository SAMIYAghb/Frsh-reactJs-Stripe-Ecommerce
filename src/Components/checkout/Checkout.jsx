import React ,{useContext} from 'react'
import styles from './checkout.module.css';
import { useFormik } from 'formik';
import { CartContext } from './../../Context/CartContext';

const Checkout = () => {
  const {generateOnlinePayement, cartId}= useContext(CartContext);
  async function handlePaiment(values){
      // console.log(values);
      let {data} = await generateOnlinePayement(cartId,values)
      console.log(data);

      if(data.session){
        console.log(data.session.url);
        window.location.href = data.session.url;
      }
  }

  let formik = useFormik({
    initialValues:{
      details:"",
      phone:"",
      city:"",
    },
    onSubmit: handlePaiment
  });
  return <>
    <h2 className='mb-5'>Payment</h2>
    <form action="w75 mx-auto my-5" onSubmit={formik.handleSubmit}>
        <label htmlFor="details" className='my-2'>Details</label>
        <input onChange={formik.handleChange}
        type="text" name='details' className='form-control mb-3'
        id='details' value={formik.values.details} />

      <label htmlFor="phone" className='my-2'>Phone</label>
        <input onChange={formik.handleChange}
        type="text" name='phone' className='form-control mb-3'
        id='phone' value={formik.values.phone} />

    <label htmlFor="city" className='my-2'>City</label>
        <input onChange={formik.handleChange}
        type="text" name='city' className='form-control mb-3'
        id='city' value={formik.values.city} />

        <button type='submit' className="btn btn-info text-white my-4 w-100">Pay</button>
    </form>
    </>
  
}

export default Checkout