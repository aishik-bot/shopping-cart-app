import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import SearchResults from './components/layout/SearchResults';
import ProductDetails from './components/products/ProductDetails';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { loadUser } from './actions/userActions';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser);
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
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
