import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import SearchResults from './components/layout/SearchResults';
import ProductDetails from './components/products/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';
import Cart from './components/cart/cart';
import Dashboard from './components/admin/Dashboard';
import { loadUser } from './actions/userActions';
import store from './store';
import NewProduct from './components/admin/NewProduct';
import Shipping from './components/cart/Shipping';
import Payment from './components/cart/Payment';
import PlaceOrder from './components/cart/PlaceOrder';


function App() {
  useEffect(() => {
    console.log("Form App.js useEffect")
    store.dispatch(loadUser());
  }, [])

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search/:keyword" element={<SearchResults/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/me" element={<Profile/>}/>
        <Route path="/me/update" element={<UpdateProfile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/new-product" element={<NewProduct/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/placeorder" element={<PlaceOrder/>}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
