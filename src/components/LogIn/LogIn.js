import React, { useContext } from 'react';
import './LogIn.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';

const LogIn = () => {
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();

    const location = useLocation(); //59-8 After Login Redirect Navigate to the right route
    const from = location.state?.form?.pathname || '/'; //location form useLoaction state from privateRouter that i sent as a props state  pathname if this things didn't get user will redirect to home 

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result =>{
                const user = result.user;
                console.log(user);
                form.reset();
                navigate(from, {replace: true}); //After Login Redirect Navigate to the right route

            })
            .catch(error => console.error(error));
    }
    return (
        <div className='form-container'>
            <h1 className='form-title'>login</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />               
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />               
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p>New to Ema John?<Link to='/signup'>Create New Account</Link></p>
        </div>
    );
};

export default LogIn;