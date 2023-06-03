import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import { RouterProvider ,  createHashRouter} from 'react-router-dom';
import About from './Components/About/About';
import Cart from './Components/Cart/Cart';
import Categories from './Components/Products/Products';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';




function App() {
  const [useData, setUseData] = useState(null);

  function saveUseData() {
    let encodedToken = localStorage.getItem('userToken'); // codé
    let decodedToken = jwtDecode(encodedToken); // decodé
    setUseData(decodedToken);
    console.log(decodedToken, 'userId from appJs');
}

  const routers = createHashRouter ([
    {
      path: "",element: <Layout useData={useData}  setUseData={ setUseData}/>,children: [
        {index: true,element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path: "home",element:<ProtectedRoute><Home/></ProtectedRoute>},
        {path: "about",element:<ProtectedRoute><About/></ProtectedRoute> },
        {path: "cart",element: <ProtectedRoute><Cart/></ProtectedRoute>},
        {path: "products",element:<ProtectedRoute><Products/></ProtectedRoute> },
        {path: "categories",element: <ProtectedRoute><Categories/></ProtectedRoute> },
        {path: "checkout",element: <ProtectedRoute><Checkout/></ProtectedRoute> },
        {path: "allorders",element:<ProtectedRoute><AllOrders/></ProtectedRoute> },
        {path: "product-details/:id",element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
        {path: "register",element: <Register/>},
        {path: "login",element: <Login saveUseData={saveUseData}/>},
        {path: "*",element: <NotFound/>},
      ],
    },
  ]);
  return(
    <CartContextProvider>
      <Toaster></Toaster>
        <RouterProvider router={routers} >
               <App/>
          </RouterProvider>
    </CartContextProvider>
     
  )
}

export default App;
