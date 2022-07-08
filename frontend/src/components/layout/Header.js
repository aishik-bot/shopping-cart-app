import React, {useEffect} from 'react';
import {NavLink, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { loadUser } from '../../actions/userActions';
import '../../App.css'

//component for Navbar containing brand logo search bar login button and cart
function Header() {
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state=>state.auth);
    console.log(user);
    // const logoutHandler = () => {
    //     dispatch(logout());
    //     alert.success('Logged out successfully.')
    // }
  return (
    <>
        {/* Navbar using bootstrap grid */}
        <nav className="navbar row">
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
                {user ? (
                    <div className="ml-4 dropdown d-inline">
                        <Link to="#" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span style={{color: "black"}}>{user && user.name}</span>
                        </Link>

                        <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                            <Link className="dropdown-item" to="/orders/me">Orders</Link>
                            <Link className="dropdown-item" to="/me">Profile</Link>
                            <Link className="dropdown-item text-danger" to="/">Logout</Link>
                        </div>
                    </div>

                    ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}

                <NavLink to="/cart" style={{ textDecoration: "none" }}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">0</span>
                </NavLink>
            </div>
        </nav>

    </>
  )
}

export default Header
