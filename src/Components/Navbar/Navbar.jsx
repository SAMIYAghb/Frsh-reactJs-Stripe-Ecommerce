import React,{useContext} from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/freshcart-logo.svg'
import { CartContext } from '../../Context/CartContext';

const Navbar = ({useData, logOut}) => {
  let {cartId, numOfCartItems}= useContext(CartContext);
  return <>
   <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container">
      <Link className="navbar-brand" to="/">
      <img className={styles.logo} src={logo} alt="" />
      </Link>
      
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">

    {useData !==null ? 
    (<ul className="navbar-nav me-auto mt-2 mt-lg-0">
    <li className="nav-item">
      <Link className="nav-link" to="/">Home</Link>
    </li>
    
    <li className="nav-item">
      <Link className="nav-link" to="products">Products</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="categories">Categories</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="brands">Brands</Link>
    </li>
    
  </ul>)
    :(null)}
        

        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
      
        <li className="nav-item d-flex align-items-center">
            <i className='fab fa-facebook mx-2'></i>
            <i className='fab fa-twitter mx-2'></i>
            <i className='fab fa-instagram mx-2'></i>
            <i className='fab fa-youtube mx-2 '></i>
          </li>
          {useData == null ? (<>
            <li className="nav-item">
            <Link className="nav-link" to="login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="register">Register</Link>
          </li>
</>) : (<>
          <li className="nav-item position-relative">
              <Link className="nav-link" to="cart">
                <i className='fa fa-shopping-cart fa-lg'></i>
                <div className="badge bg-main position-absolute top-0 end-0 fa-md">{numOfCartItems}</div>
              </Link>
          </li>
          <li className="nav-item">
            <span onClick={logOut}
             className="nav-link cursor-pointer" >Logout</span>
          </li></>)}
          
          

          
        </ul>
        
      </div>
     </div>
   </nav>
   
    </>
  
}

export default Navbar