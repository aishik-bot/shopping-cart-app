import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { getProductDetails, clearErrors } from '../../actions/productActions';
import { Col, Form, ListGroupItem, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';

function ProductDetails() {
    const [qty, setQty] = useState(1);

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProductDetails(id))
    },[dispatch, id])

    const addToCartHandler=()=>{
        if(!user){
            alert('Login to add to cart')
            navigate('/login')
        }
        else{
            console.log("button clicked")
            navigate(`/cart`)
            dispatch(addToCart(id,qty,user._id))
        }        
    }
  return (
    <>
      {loading ? <Loader/> : (
          <React.Fragment>
                <MetaData title={product.name}/>
                <div className="row d-flex justify-content-around">
                    {/* <div className="col-12 col-lg-5 img-fluid" id="product_image">
                        <img className="d-block w-100" src={product.images[0].url} alt={product.title} />
                    </div> */}
                    <div className="col-12 col-lg-5 mt-5">
                        <h3>{product.name}</h3>
                        <p id="product_id">Product # {product._id}</p>
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                        <p id="product_price">${product.price}</p>
                        <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={product.stock <= 0? true: false} onClick={addToCartHandler}>Add to Cart</button>
                        <p>Status: <span id="stock_status" className={product.stock > 0 ? 'greenColor' : 'redColor'} >{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
                        {product.stock>0 && (
                            <ListGroupItem>
                                <Row>
                                    <Col ><h3>Qty</h3></Col>
                                    <Form.Control
                                        as="select"
                                        value={qty}
                                        onChange={(e)=>setQty(e.target.value)}
                                    >
                                        {[...Array(product.stock).keys()].map((x)=>(
                                            <option key={x+1} value={x+1}>
                                                {x+1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Row>
                            </ListGroupItem>
                        )}
                        <h4 className="mt-2">Description:</h4>
                        <p>{product.description}</p>
                    </div>
                </div>
          </React.Fragment>
      )}
    </>
  )
}

export default ProductDetails
