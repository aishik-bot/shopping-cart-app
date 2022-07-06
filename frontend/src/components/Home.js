import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import MetaData from './layout/MetaData';
import Product from './products/Product';
import Loader from './layout/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../actions/productActions';
import { useParams } from 'react-router-dom';

function Home() {
  const [currentPage , setCurrentPage ] = useState(1);

  const dispatch = useDispatch();
  const { loading, products, productsCount, resultsPerPage, error } = useSelector(state => state.products)
  
  const {keyword} = useParams();
  
  useEffect(()=>{
    dispatch(getProducts(keyword, currentPage))
  }, [dispatch, currentPage, keyword])


  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber)
  }
  return (
    <>
      <MetaData title={'One stop Shopping for all'}/>
      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="/images/Laptop.jpeg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="/images/clothing-accessories-men-women.jpg" className="d-block w-100" alt="..."/>
            </div>
            <div className="carousel-item">
            <img src="/images/Oled-tv.jpeg" className="d-block w-100" alt="..."/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Products cards */}
      {/* If loading = true then loader component is rendered else products are shown */}
      {loading ? <Loader/> : (
        <div className="container-fluid">
          <h2 id="product-heading">Latest Arrivals</h2>
          <div className="row">
            {products && products.map(product=>(
              <Product key={product.name} product={product}/>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultsPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText={'Next'}
                prevPageText={'Prev'}
                firstPageText={'First'}
                lastPageText={'Last'}
                itemClass="page-item"
                linkClass="page-link"
              />
          </div>
        </div>
      )}
    </>
  )
}

export default Home
