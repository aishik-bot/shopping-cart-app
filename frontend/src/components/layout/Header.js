import React from 'react';
import {NavLink, Route} from 'react-router-dom';
import Search from './Search';
import '../../App.css'

//component for Navbar containing brand logo search bar login button and cart
function Header() {
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
                <button className="btn" id="login_btn">Login</button>
                <span id="cart" className="ml-3">Cart</span>
                <span className="ml-1" id="cart_count">2</span>
            </div>
        </nav>

    </>
  )
}

export default Header
