import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

function Profile() {
    const {user, loading} = useSelector(state => state.auth)
  return (
    <>
        <MetaData title={'My Profile'} />
      {loading? <Loader/> : (
          <>
            <h2 className="mt-5 ml-5" style={{paddingLeft: "2.5rem", color:"#aa4db6"}}>My Profile</h2>
            <div className="row justify-content-around mt-5 user-info">
                <figure className='avatar avatar-profile'>
                    <img className="rounded-circle img-fluid" src="https://media.istockphoto.com/vectors/user-avatar-profile-icon-black-vector-illustration-website-or-app-ui-vector-id1314335932?b=1&k=20&m=1314335932&s=612x612&w=0&h=9vvREzKm4ROpV5j3mQ3NfotzW00tS4w7r-bKZabCdNs=" alt={user.name} />
                </figure>
                <div className="col-12 col-md-5">
                    <h4>Full Name</h4>
                    <p>{user.name}</p>

                    <h4>Email Address</h4>
                    <p>{user.email}</p>

                    <h4>Joined On</h4>
                    <p>{String(user.createdAt).substring(0, 10)}</p>

                    {user.role !== 'admin' && (
                        <NavLink to="/orders/me" className="btn btn-danger btn-block mt-5">
                            My Orders
                        </NavLink>
                    )}
                <div className="col-12 col-md-3">
                    <NavLink to="/me/update" id="edit_profile" className="btn btn-primary btn-block my-5">
                        Edit Profile
                    </NavLink>
                </div>
                </div>
            </div>
          </>
      )}
    </>
  )
}

export default Profile
