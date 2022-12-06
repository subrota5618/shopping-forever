import { getShoppingCart } from "../addToDb/addToDb";
export const MyLoaders = async () => {
 const porductData = await fetch("products.json") ;
 const products = await porductData.json() ;
 const saveCartItem = getShoppingCart() ;
let intialCart = [] ;
for(const id  in saveCartItem) {
const addedProducts  = products.find(product => product.id === id) ;
   if(addedProducts) {
    let quantity = saveCartItem[id] ;
    addedProducts.quantity = quantity  ;
    intialCart.push(addedProducts) ;
   }
} 
 return {products:products  , intialCart : intialCart } ;
};
