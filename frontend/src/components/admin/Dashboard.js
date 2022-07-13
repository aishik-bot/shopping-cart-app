import React from 'react'
import {NavLink} from 'react-router-dom'
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';

function Dashboard() {

  return (
    <>
        <MetaData title={'Admin Dashboard'}/>
      <div className="row">
        <div className="col-12 col-md-10">
            <h1 className="my-4">Dashboard</h1>
            <NavLink to="/admin/new-product"><button>New Product</button></NavLink>
        </div>
      </div>
    </>
  )
}


export default Dashboard
