import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import SearchResults from './components/layout/SearchResults';
import ProductDetails from './components/products/ProductDetails';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search/:keyword" element={<SearchResults/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
