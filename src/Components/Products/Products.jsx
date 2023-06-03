import React, { useContext, useEffect, useState } from 'react'
import styles from './Products.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
  let{createCart, setNumOfCartItems} = useContext(CartContext);
  const [allProducts, setAllProducts] = useState([]);

  async function getProducts() {

    let{data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    // console.log(data.data);
    setAllProducts(data.data)
  }

  async function generateCart(productId){
    let response = await createCart(productId);
    // console.log(response ,'from products component');

    if(response.data.status === 'success'){
        toast.success(response.data.message,{
          position: 'bottom-right',
          className:"text-center border-success border-2 box-shadow"
        })
        setNumOfCartItems(response.data.numOfCartItems)
    }else{
      toast.error(response.data.message,{
        position: 'bottom-right',
        className:"text-center border-success border-2 box-shadow"
      })
    }
  }
 
  useEffect(() => {
    getProducts();   
  }, [])
  
  return <>
    <h2 className=' h3 title mt-5'>All products</h2>
    <div className="row">
      {allProducts.map((product) =>
        <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
          <div className="product px-4 py-3">
            <Link to={'/product-details/'+product.id}>
                <img src={product.imageCover} alt="" className="w-100" />
              
                <span className='text-main font-xsm'>{product.category.name}</span>
                <h3 className='h6'>{product.title.split(" ").splice(0,2).join(" ")}</h3>
                <div className="d-flex justify-content-between">
                  <p>{product.price} EGP</p>
                  <div className="rating">
                      <i className='fa fa-star rating-color'></i><span className='ps-2'>{product.ratingsAverage}</span>
                  </div>
                </div>
            </Link>
          </div>
          
            <button 
            onClick={()=>{generateCart(product._id)}}
            className="btn bg-main text-white w-100 my-3">+ Add</button>       
      </div>
      )}
    </div>
    </>
  
}

export default Products