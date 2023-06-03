import axios from "axios"
import { createContext, useState, useEffect } from "react"



export const CartContext = createContext()


export default function CartContextProvider(props){
    
    const[cart, setCart] = useState();
    const[numOfCartItems, setNumOfCartItems] = useState(0);
    const[cartId, setCartId] = useState(null);
    
    let headers = {token :localStorage.getItem('userToken')};

    useEffect(() => {
        getInitialValues();
    }, [])

    async function getInitialValues(){
        let {data} = await getCart();
        if(data.status === 'success'){
            setNumOfCartItems(data.numOfCartItems);
            setCartId(data.data._id);
        }
        console.log(data, 'from cart context');
        console.log(data.numOfCartItems,data.data._id, 'from cart context');
    } 
    

    function createCart(x){
       return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,{productId:x},{headers}
        ).then(res =>res)
        .catch(err => err)
    }


    function getCart(){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,{headers}
         ).then(res =>res)
         .catch(err => err)
     }


    function updateCart(id,count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{count},{headers}
        ).then(res =>res)
         .catch(err => err)
     }

     
     
    function removeCartItem(id){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,{headers}
        ).then(res =>res)
         .catch(err => err)
     }

    
    function generateOnlinePayement(cartId, shippingAddress){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress:shippingAddress},{headers}
        ).then(res =>res)
         .catch(err => err)
    }
   

    return <CartContext.Provider value={{cart, createCart,getCart, updateCart, removeCartItem, generateOnlinePayement, numOfCartItems,cartId, setNumOfCartItems}}>
     {props.children}
    </CartContext.Provider>
}