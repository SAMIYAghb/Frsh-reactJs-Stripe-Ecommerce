import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import { Offline} from "react-detect-offline";
import {Helmet} from "react-helmet";
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartDetails, setcartDetails] = useState({})
  let {getCart, updateCart, removeCartItem} = useContext(CartContext);

  async function getCartDetails(){
    let res = await getCart();
    console.log(res, 'from cart =>CartDetails');
    setcartDetails(res.data)
  }

  async function updateCartHandler(id,count){
    let res = await updateCart(id,count);
    console.log(res, 'from cart =>updateCartHandler');
    setcartDetails(res.data)
  }

  async function deleteItemOfCartHandler(id){
    let res = await removeCartItem(id);
    console.log(res, 'from cart =>removeCartItem');
    setcartDetails(res.data);
  }

  useEffect(() => {
    getCartDetails() 
  }, [])
  
  return <>
  <>
      <Helmet>
              <meta charSet="utf-8" />
              <title>Shop Cart</title>         
      </Helmet>
  <div>
    {/* <Online><span className='network-status'> Only shown when you're online</span></Online> */}
    <Offline><span className='network-status'>Only shown offline (surprise!)</span></Offline>
  </div>
  </>

    {cartDetails && cartDetails.data && 
    <div className="cartDetails bg-main-light p-5">
      <h2>Cart details</h2>
      <h6>You have <span className='text-main'> {cartDetails.numOfCartItems}</span> items in your cart</h6>
      <p></p>
      {cartDetails.data.products.map((product)=><>
      {/* <div key={product.product._id} className="row border-bottom border-bottom-danger p-3"> */}
      <div key={product.product.id} className="row border-bottom border-bottom-danger p-3">
        <div className="col-md-1">
          <img src={product.product.imageCover}alt="" className='w-100 cart-details-img'/>
        </div>
        <div className="col-md-11 d-flex justify-content-between align-items-center">
          <div className="">
              <h4 className='h5'>{product.product.title}</h4>
              <h6>{product.product.brand.name}</h6>
              <p className='text-main'>{product.price} EGP</p>
              <p>{product.product.category.name}</p>
              <button
              onClick={()=>{deleteItemOfCartHandler(product.product._id)}}
               className='btn text-danger'><i className='fa fa-trash'></i> Remove</button>
          </div>
          <div className="d-flex gap-3 align-items-center">             
                <button 
                onClick={()=>{updateCartHandler(product.product._id, product.count-1)}}
               className='btn btn-danger'>-</button>
              <p className='mb-0'> {product.count} </p>  
                <button
                 onClick={()=>{updateCartHandler(product.product._id, product.count+1)}}
               className='btn btn-cart bg-main text-white'>+</button>           
              
          </div>         
        </div>
        
      </div>
      </>)}
      <h4 className='pt-3'>Total Price : <span className='text-main'> {cartDetails.data.totalCartPrice} EGP</span></h4>
      <Link to={'/checkout'}className="btn bg-main text-white mt-4">Payment</Link>
    </div>
    } 
   
    
    
    </>
  
}

export default Cart