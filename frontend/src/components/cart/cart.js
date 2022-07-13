import React,{useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
//dispatch to request and selector tp retrieve the data
import {Row,Form,Button,Card,Image,ListGroup, Col, ListGroupItem} from 'react-bootstrap'
import {addToCart, removeFromCart} from '../../actions/cartAction'
import { Link, useNavigate } from 'react-router-dom';
const Cart =()=>{
    const dispatch =useDispatch();
    const history=useNavigate()
    const {cartItems} = useSelector(state=>state.cart);
    const {user} = useSelector(state=>state.auth);
    let userCart = cartItems.filter(item=>item.userId===user._id);
    console.log(cartItems)
    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id))
    }
    const checkout=()=>{
        history(`/shipping`)
    }
    return(
        <>
            <Row>
                <Col md={8}>
                    <h1>Shopping cart</h1>
                    {
                        userCart.length===0?(
                            <h4>
                                Your Cart is empty
                                <Link to='/'>Shop Now</Link>
                            </h4>
                        ):(<ListGroup variant="flush">
                            {
                                
                                userCart.map(item=>
                                    <ListGroupItem>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2}>
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                            
                                            <Form.Control
                                             
                                                    as="select"
                                                    value={item.quantity}
                                                    onChange={(e)=>dispatch(
                                                        addToCart(item.product, Number(e.target.value))
                                                    )}
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x)=>(
                                                    
                                                        <option key={x+1} value={x+1} >
                                                            {x+1}
                                                        </option>
                                                
                                                    ))}
                                                    

                                    </Form.Control>
                                    <Button
                                    
                                    type="button"
                                    variant="light"
                                    onClick={()=>removeFromCartHandler(item.product)}
                                    >
                                        <i className='fa fa-trash text-danger' aria-hidden='true' md={2}>
                                            Remove 
                                        </i>

                                    </Button>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )
                            }
                        </ListGroup>
                    )}
                </Col>
               <Col md={2}>
                <Card>
                    <ListGroup variant ="flush">
                        <ListGroupItem>
                            <h2>
                                Subtotal ({userCart.reduce((acc,item)=>acc+Number(item.quantity),0)}) items
                            </h2>
                            $
                            {userCart.reduce((acc,item)=>acc+item.quantity*item.price,0).toFixed(2)}
                        </ListGroupItem>
                        <Button 
                        type="button"
                        className='btn-block'
                        disabled={userCart.length==0}
                        onClick={checkout}
                        >
                            Proceed to checkout
                        </Button>
                    </ListGroup>
                </Card>
               </Col>
            </Row>
        </>
    )
}
export default Cart