import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import MetaData from './MetaData';
import Product from '../products/Product';
import Loader from './Loader';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../actions/productActions';
import { useParams } from 'react-router-dom';

function SearchResults() {
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
    <div>
        <MetaData title={`Search Results for ${keyword}`}/>
        {loading ? <Loader/> : (
        <div className="container-fluid">
          <h2 id="product-heading">{`Search Results for "${keyword}"`}</h2>
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
    </div>
    )
}

export default SearchResults
