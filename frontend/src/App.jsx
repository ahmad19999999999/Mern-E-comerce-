import React, { useEffect } from 'react'
import Home from './pages/Home.jsx'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Productdetails from './pages/Productdetails.jsx'
import Products from './pages/Products.jsx'
import Register from './user/Register.jsx'
import Login from './user/Login.jsx'
import UserDashbord from './user/UserDashbord.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { loaduser } from './features/user/userslice.js'
import Profile from './user/Profile.jsx'
import ProtecetdRout from './components/ProtecetdRout.jsx'
import UpdateProfile from './user/UpdateProfile.jsx'
import Updatepassword from './user/Updatepassword.jsx'
import Forgetpassword from './user/Forgetpassword.jsx'
import Rasatepassword from './user/Rasatepassword.jsx'
import Cart from './cart/Cart.jsx'
import Shipping from './cart/Shipping.jsx'
import Orderconfirm from './cart/Orderconfirm.jsx'
import ProccessPayment from './cart/ProccessPayment.jsx'
import CheckoutForm from './cart/Formchekout.jsx'
import CheckoutAftermath from './cart/Successpayment.jsx'
import Myorder from './orders/Myorder.jsx'
import OrderDetails from './orders/OrderDetails.jsx'
import Dashbord from './Admin/Dashbord.jsx'
import ProductsList from './Admin/ProductsList.jsx'
import Createproduct from './Admin/CreateProduct.jsx'
import UpdateProduct from './Admin/UpdateProduct.jsx'
import UserList from './Admin/UserList.jsx'
import UpdateUserRole from './Admin/UpdateUserRole.jsx'
import OrderList from './Admin/OrderList.jsx'
import UpdateOrder from './Admin/UpdateOrder.jsx'
import ReviewsList from './Admin/ReviewsList.jsx'


const App = () => {
  const {isAuthenticated,user}=useSelector(state=>state.user)
  const despatch=useDispatch()
  useEffect(()=>{
    if(isAuthenticated){
      despatch(loaduser())
    }

  },[despatch])
  console.log(isAuthenticated,user)
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/product/:id" element={<Productdetails/>} />
           <Route path="/products" element={<Products/>} />
           <Route path="/products/:keyword" element={<Products/>} />
           <Route path="/register" element={<Register/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/profile" element={<ProtecetdRout element={<Profile/>}/>} />
            <Route path="/update/profile" element={<ProtecetdRout element={<UpdateProfile/>}/>} />
            <Route path="/update/password" element={<ProtecetdRout element={<Updatepassword/>}/>} />
            <Route path="/shipping" element={<ProtecetdRout element={<Shipping/>}/>} />
            <Route path="/order/confirm" element={<ProtecetdRout element={<Orderconfirm/>}/>} />
             <Route path="/proccess/payment" element={<ProtecetdRout element={<ProccessPayment/>}/>} />
             <Route path="/checkout/form" element={<ProtecetdRout element={<CheckoutForm/>}/>} />
            <Route path="/after/chekout" element={<ProtecetdRout element={<CheckoutAftermath/>}/>} />
            <Route path="/getmy/orders" element={<ProtecetdRout element={<Myorder/>}/>} />
            <Route path="/order/:orderId" element={<ProtecetdRout element={<OrderDetails/>}/>} />
            <Route path="/admin/dashbord" element={<ProtecetdRout element={<Dashbord/>} adminonly={true}/>} />
            <Route path="/admin/products" element={<ProtecetdRout element={<ProductsList/>} adminonly={true}/>} />
            <Route path="/admin/product/create" element={<ProtecetdRout element={<Createproduct/>} adminonly={true}/>} />
            <Route path="/admin/product/:id" element={<ProtecetdRout element={<UpdateProduct/>} adminonly={true}/>} />
             <Route path="/admin/users" element={<ProtecetdRout element={<UserList/>} adminonly={true}/>} />
             <Route path="/admin/user/:id" element={<ProtecetdRout element={<UpdateUserRole/>} adminonly={true}/>} />
             <Route path="/admin/orders" element={<ProtecetdRout element={<OrderList/>} adminonly={true}/>} />
             <Route path="/admin/order/:orderId" element={<ProtecetdRout element={<UpdateOrder/>} adminonly={true}/>} />
             <Route path="/admin/reviewId" element={<ProtecetdRout element={<ReviewsList/>} adminonly={true}/>} />
            <Route path="/forgate/password" element={<Forgetpassword/>} />
            <Route path="/reset/:token" element={<Rasatepassword/>} />
             <Route path="/cart" element={<Cart/>} />
          
        
      </Routes>
       {isAuthenticated && <UserDashbord user={user}/>}
    </Router>

  )
}

export default App