import React from 'react'
import {Button, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
const CheckoutStep =({step1, step2, step3})=>{
    return(
        <>
        <Nav className="justify-content-center mb-4">
            <Nav.Item>
                {step1?(
                    <Link to="/shipping" >
                    <Button type="button" className="btn-block">Shipping</Button>
                    </Link>
                ):(
                    <Button type="button" className="btn-block" disabled>shipping</Button>
                )}
            </Nav.Item>
           
            <Nav.Item>
          {step2 ? (
            <Link to="/payment">
              <Button>Payment</Button>
            </Link>
          ) : (
            <Button disabled>Payment</Button>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <Link to="/placeorder">
              <Button>Place Order</Button>
            </Link>
          ) : (
            <Button disabled>Place Order</Button>
          )}
        </Nav.Item>
        </Nav>
        </>
    )
}
export default CheckoutStep