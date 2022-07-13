import React, {useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { logout } from '../../actions/userActions';

//component for Navbar containing brand logo search bar login button and cart
function Header() {
    const {cartItems} = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state=>state.auth);
    if(user){
        var userCart = cartItems.filter(item=>item.userId===user._id);
    }
    console.log("from header.js "+user);
    const logoutHandler = () => {
        dispatch(logout());
        alert('Logged out successfully.')
    }
  return (
    <>
        {/* Navbar using bootstrap grid */}
        <nav className="navbar navbar-expand-lg row sticky-top">
            {/* brand with logo */}
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <NavLink to="/">
                        <img src="/ShopioLogo.png" width = "160" alt=""/>
                    </NavLink>
                </div>
            </div>

            {/* Search-box */}
            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {/* Login button */}
                {/* If user is logged in show user and dropdown else render login button */}
                {user? (
                    <>
                        {/* User Dropdown */}
                        <div className="ml-4 dropdown d-inline">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {user && user.name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-light text-black mr-4" aria-labelledby="dropdownMenuButton">
                                {user && user.role === 'admin' && (
                                    <li><NavLink className="dropdown-item" to="/dashboard">Dashboard</NavLink></li>
                                )}
                                <li><NavLink className="dropdown-item" to="/me">My Profile</NavLink></li>
                                <li><NavLink className="dropdown-item" to="/orders/me">Orders</NavLink></li>
                                <li><NavLink className="dropdown-item text-danger" to="/" onClick={logoutHandler}>Logout</NavLink></li>
                            </ul>
                        </div>
                        {/* Cart */}
                        <NavLink to="/cart" style={{ textDecoration: "none" }}>
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">{userCart.length}</span>
                        </NavLink>
                    </>

                    ) : !loading && <NavLink to="/login" className="btn ml-4" id="login_btn">Login</NavLink>}
            </div>
        </nav>

    </>
  )
}

export default Header
