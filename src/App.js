
import './App.css';
import AOS from 'aos';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainOutlet from './Main/MainOutlet';
import Shop from './components/Shop/Shop';
import Contact from './components/Contact/Contact';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import { MyLoaders } from './components/Loaders/Loaders';
import Phones from './components/Phones/Phones';
import Phone from './components/Phones/Phone';
import Register from './components/Users/Register';
import PrivateRouter from './PrivateRouter/PrivateRouter';
import Blog from './components/Blog/Blog';
function App() {
  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  const router = createBrowserRouter([
{path:"/" , element:<MainOutlet></MainOutlet> , children: [
  {path:"/" , 
  loader: async () =>  fetch("products.json")
  ,element : <Shop></Shop>} ,
  {path : "/contact" , element :<PrivateRouter> <Contact></Contact></PrivateRouter>} , 
  {path : "/login" , element : <Login></Login>} , 
  {path : "/orders" ,
  loader: MyLoaders,
   element :<PrivateRouter> <Orders></Orders></PrivateRouter>} , 
  {path:"/blog" , element : <PrivateRouter> <Blog></Blog> </PrivateRouter>}  , 
  {
    path:"/phones" , 
    loader: () => fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`) 
    ,element: <PrivateRouter><Phones></Phones></PrivateRouter>
  } ,  
  {
    path:"/phones/:id/" ,
    loader:async({params}) => fetch(`https://openapi.programming-hero.com/api/phone/${params.id}`) ,
    element: <Phone> </Phone>
  } ,
  {
    path:"/register" , element: <Register> </Register>
  } ,
]} 

  ])
  return (
<div className="main-div">
<RouterProvider router={router} > </RouterProvider>
    </div>
  );
}

export default App;
