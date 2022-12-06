import React, { useEffect, useState } from 'react';
import { NavLink, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../addToDb/addToDb';
import Cart from '../Cart/Cart';
import Prouduct from '../Product/Prouduct';
import "./Shop.css" ;
const Shop = () => {
const products = useLoaderData() ;
const [cart , setCart] = useState([]) ; 
const clearCart = () => {
    setCart([]) ;
    deleteShoppingCart() ;
    }
//data from local storage and api check 
useEffect(() => {
const getCartItem = getShoppingCart() ;
let saveCartItem = [] ;
for(let id in getCartItem) {
const addedProduct = products.find(cartProduct => cartProduct.id === id )  ;
//
if(addedProduct) {
  const getCartQuantity= getCartItem[id] ;
  addedProduct.quantity = getCartQuantity ; //api quantity will be chenged 
  saveCartItem.push(addedProduct) ;
}
//
    }
setCart(saveCartItem) ;
    }, [products])
//handle onclick to pass or get data 
const handleOnClick = (selectedProduct) => {
    //check id inserted or not 
let cartCountUpdate = [] ;
const exist = cart.find(getProduct => getProduct.id === selectedProduct.id) ;
if(!exist) {
selectedProduct.quantity = 1 ;
  cartCountUpdate = [...cart , selectedProduct] ;
} else {
    const rest = cart.filter(getProduct => getProduct.id !== selectedProduct.id) ; 
        exist.quantity = exist.quantity + 1 ;
        cartCountUpdate = [...rest , exist] ;
    
}


setCart(cartCountUpdate) ;
addToDb(selectedProduct.id) ;

}



    return (
        <div className='shopping-container'>
           <div className="product-container">
         {
            products.map(product => <Prouduct key={product.id}
                 handleOnClick={handleOnClick}  product={product}>
               </Prouduct>)
         }
            </div> 
            <div className="cart-container">
           <Cart cart={cart} clearCart={clearCart}>
                     
  <NavLink to="/orders">
     <button className='ordersReview'>  Order review   </button>
          </NavLink>
           </Cart>
            </div>
        </div>
    );
};

export default Shop;