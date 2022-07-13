import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../actions/userActions';
import MetaData from '../layout/MetaData';

function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    // destructure name, email, password from user
    const { name, email, password } = user;

    const { isAuthenticated, error, loading } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        // if user is already logged in navigate to homepage
        if(isAuthenticated){
            navigate('/');
        }

        if (error) {
            // alert(error);
            dispatch(clearErrors());
        }
    },[dispatch, isAuthenticated, navigate, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email, password))
    }

    const onChange = (e)=>{
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    return (
        <>
            <MetaData title={'Register'}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>
                        {/* Name input field */}
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        {/* Email input field */}
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        {/* Password input field */}
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
