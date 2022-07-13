import React, {useState, useEffect} from 'react';
import MetaData from '../layout/MetaData';
import { NavLink } from 'react-router-dom';
import Loader from '../layout/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearErrors } from '../../actions/userActions';
//import { useFormik } from 'formik';

function Login() {
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const dispatch = useDispatch();

  // const formik = useFormik({
  //   initialValues : {
  //     email_field: '',
  //     password: ''
  //   },

  //   validate: (values)=>{
  //     let errors = {};
  //     const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  //     if(values.email == ' '){
  //       errors.email = "Email is required";
  //     }
  //     else if(!filter.test(values.email)){
  //       errors.email = "Invalid email";
  //     }

  //     if(values.password == ''){
  //       errors.password = "Password is required";
  //     }
  //     else if(values.password.length < 8){
  //       errors.password = "Password should be minimum 8 characters";
  //     }
  //   },

  //   onsubmit : (values)=>{
  //     submitHandler()
  //   }
  // })

  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector(state=> state.auth);

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }

    if(error){
      console.log(error);
      dispatch(clearErrors);
    }
  }, [dispatch, isAuthenticated, error, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <>
      <MetaData title={'Login'}/>
      {loading? <Loader/> : (
        <div>
          <div className="row wrapper">
              <div className="col-10 col-lg-5">
                  <form className="shadow-lg" onSubmit={submitHandler}>
                      <h1 className="mb-3" align="center">Login</h1>
                      <div className="form-group">
                          <label htmlFor="email_field">Email</label>
                          <input
                              type="email"
                              id="email_field"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>

                      <div className="form-group">
                          <label htmlFor="password_field">Password</label>
                          <input
                              type="password"
                              id="password_field"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                          />
                      </div>

                      <button
                          id="login_button"
                          type="submit"
                          className="btn btn-block py-3"
                      >
                          LOGIN
                      </button>

                      <NavLink to="/register" className="float-right mt-3">New User?</NavLink>
                  </form>
              </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
