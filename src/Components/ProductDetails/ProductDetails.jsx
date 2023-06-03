import React,  {useState, useEffect, useContext} from 'react'
import styles from './ProductDetails.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';


const ProductDetails = () => {

  let {createCart} = useContext(CartContext);

  let {id} = useParams();
//   console.log(id);
  const [productDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

//   console.log(productDetails);
  
  async function getProductDetails() {
    setIsLoading(true);
    let{data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`);

    // console.log(data.data);
    setProductDetails(data.data)
    setIsLoading(false);
  }
 
  useEffect(() => {
    getProductDetails() 
  }, [])
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <>
    <h1 className='mb-5 title'>Product Details</h1>
    
    <div className="row align-items-center justify-content-center py-3">
        {isLoading 
        ? (<div className="text-center"><i className='fa fa-spinner fa-spin fa-3x text-main'></i></div>)
        :<>
        <div className="col-md-4">
        <Slider {...settings}>
        {productDetails?.images.map((img)=><img src={img}
         alt="" className=""/>
         )} 
        </Slider> 
        </div>
    
        <div className="col-md-7 ms-5">
            <h2>{productDetails?.title} </h2>
            <p>{productDetails?.description} </p>
            <div className="d-flex justify-content-between">
                  <p>{productDetails?.price} EGP</p>
                    <div className="rating">
                            <i className='fa fa-star rating-color'></i>
                            <span className='ps-2'>
                                {productDetails?.ratingsAverage}
                            </span>
                    </div>
            </div>
            <button 
            onClick={()=>{createCart(productDetails.id)}}
            className="btn bg-main text-white w-100 my-3">+ Add</button>
        </div>
        
        </>
        }
    
        
    </div>
    </>
  
}

export default ProductDetails