import React,{useEffect,Suspense} from "react"
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Sentry from "react-activity/dist/Sentry"
import  "react-activity/dist/Sentry.css"

//admin screens
//import AddProduct from './screens/admin/addProduct/AddProduct'
//import EditProduct from './screens/admin/editProduct/EditProduct'
//import Products from './screens/admin/products/Products'
//import AdminOrders from "./screens/admin/dashboard/Dashboard"
//import AdminLogin from './screens/Auth/AdminLogin'
//import EditAdminProfile from "./screens/general/editProfile/editAdminProfile"
//import AdminOrderDetail from "./screens/user/order/adminOrderDetail"
//import AdminSearchResult  from "./screens/admin/adminSearch/search"
//import AdminSignup from './screens/Auth/AdminSignup'
//import UserOrders from './screens/admin/userOrders/userOrder'
//user screen
//import UserProducts from './screens/user/Products/products'
//import Cart from './screens/user/cart/cart'
//import Shipping from './screens/user/shipping/shipping'
//import Payment from './screens/user/payment/payment'
//import Dashboard from "./screens/user/dashboard/Dashboard"
//import OrderDetail from "./screens/user/order/orderDetail"
//import Search from "./screens/user/searchresult/searchresult"
//import ProductCategories from './screens/user/Products/productsCategory'
//auth screens
//import Login from './screens/Auth/Login'
//import Signup from './screens/Auth/Signup'
//import Chat from './screens/Auth/Chat'
//general screen
//import EditProfile from "./screens/general/editProfile/editProfile"
//import ProductDetail from "./screens/general/productDetail/productDetail"
//import ProductComment from "./screens/general/productComment/productComment"
//import Home from './screens/general/home/home'
//import Notification from './screens/general/notification/notification'
import { checkIfIsLoggedIn } from "./store/action/userAppStorage";
import { useDispatch } from "react-redux";
import EmptyModal from "./elements/Modal/EmptyModal"

const AddProduct = React.lazy(()=>import('./screens/admin/addProduct/AddProduct'))
const EditProduct = React.lazy(()=>import('./screens/admin/editProduct/EditProduct'))
const  Products = React.lazy(()=>import('./screens/admin/products/Products'))
const AdminOrders = React.lazy(()=>import("./screens/admin/dashboard/Dashboard"))
const AdminLogin = React.lazy(()=>import('./screens/Auth/AdminLogin'))
const EditAdminProfile = React.lazy(()=>import("./screens/general/editProfile/editAdminProfile"))
const AdminOrderDetail = React.lazy(()=>import("./screens/user/order/adminOrderDetail"))
const AdminSearchResult = React.lazy(()=>import("./screens/admin/adminSearch/search"))
const AdminSignup = React.lazy(()=>import('./screens/Auth/AdminSignup'))
const UserOrders = React.lazy(()=>import('./screens/admin/userOrders/userOrder'))
//user screen
const UserProducts = React.lazy(()=>import('./screens/user/Products/products'))
const  Cart = React.lazy(()=>import('./screens/user/cart/cart'))
const Shipping = React.lazy(()=>import('./screens/user/shipping/shipping'))
const Payment = React.lazy(()=>import('./screens/user/payment/payment'))
const Dashboard = React.lazy(()=>import("./screens/user/dashboard/Dashboard"))
const OrderDetail = React.lazy(()=>import("./screens/user/order/orderDetail"))
const  Search = React.lazy(()=>import("./screens/user/searchresult/searchresult"))
const ProductCategories = React.lazy(()=>import('./screens/user/Products/productsCategory'))
//auth screens
const Login = React.lazy(()=>import('./screens/Auth/Login'))
const Signup = React.lazy(()=>import('./screens/Auth/Signup'))
const Chat = React.lazy(()=>import('./screens/Auth/Chat'))
//general screen
const EditProfile = React.lazy(()=>import("./screens/general/editProfile/editProfile"))
const ProductDetail = React.lazy(()=>import("./screens/general/productDetail/productDetail"))
const ProductComment = React.lazy(()=>import("./screens/general/productComment/productComment"))
const Home = React.lazy(()=>import('./screens/general/home/home'))
const Notification = React.lazy(()=>import('./screens/general/notification/notification'))
const Fallback = React.lazy(()=>import('./screens/general//fallbackscreen/fallbackScreen'))





function App() {
  let dispatch = useDispatch()

  useEffect(async ()=>{
    await dispatch(checkIfIsLoggedIn())

  },[])
  
  return (
    


    <div  className="App">
      <Suspense fallback={<div style={{display:'flex',justifyContent:"center",alignItems:"center",width:'100vw',height:'100vh'}} >
            <Sentry size={50} />
        
        </div>}>
        <Routes>
        {/* Admin Routes */}
        <Route path='/adminlogin' element={< AdminLogin/>} />
        <Route path='/adminsignup' element={<AdminSignup/>} />
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/adminproducts' element={<Products/>} />
        <Route path='/editproduct/:id' element={<EditProduct/>} />
        <Route path='/admindashboard' element={<AdminOrders/>} />
        <Route path='/chat/:id' element={<Chat/>} />
        <Route path='/editAdminProfile' element={<EditAdminProfile/>} />
        <Route path='/adminorder/:id' element={<AdminOrderDetail/>} />
        <Route path='/adminsearched' element={<AdminSearchResult />} />
        <Route path='/userorders/:id' element={<UserOrders/>} />
        {/* user products*/}
        <Route path='/editProfile' element={<EditProfile/>} />
        <Route path='/products' element={<UserProducts/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/login' element={< Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />

        <Route path='/order/:id' element={<OrderDetail/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/searched' element={<Search/>} />
        {/*general route */}
        <Route path='/products/:category' element={<ProductCategories/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/comment/:id' element={<ProductComment/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/notification' element={<Notification/>} />
        {/*404 page  */}
        <Route path='*' element={<div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><EmptyModal emptyText="404 PAGE NOT FOUND"/></div>} />
      </Routes>

      </Suspense>
      
    </div>

  );
}

export default App;
