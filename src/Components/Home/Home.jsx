import React from 'react'
import styles from './Home.module.css';
import Products from './../Products/Products';
import Categories from '../Categories/Categories';
import MainSlider from './../MainSlider/MainSlider';
import {Helmet} from "react-helmet";

const Home = () => {
  return <>
  
      <Helmet>
              <meta charSet="utf-8" />
              <title>Home Page</title>         
      </Helmet>
    <MainSlider/>
    <h2 className='h3 title my-3'>Shop Popular Categories</h2>
    <Categories/>
    <Products/>
    </>
  
}

export default Home