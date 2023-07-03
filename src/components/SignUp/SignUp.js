import React, { useContext, useState } from 'react';
import './Signup.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';

const SignUp = () => {
    const [error, setError] = useState(null);
    const {createUser} = useContext(AuthContext);

    const handleSubmit = (event) =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPass = form.confirm.value;
        console.log('signup', email, password, confirmPass);

        if(password.length<6){
            setError("password should be 6 characters or more");
            return;
        }

        if(password !== confirmPass){
            setError("password didn't match");
            return;
        }

        createUser(email, password)
            .then( result =>{
                const user = result.user;
                console.log(user);
                form.reset();
            })
            .catch( error => console.log(error));


    }

    return (
        <div className='form-container'>
            <h1 className='form-title'>singUp</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' required />               
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' required />               
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name='confirm' required />               
                </div>
                <p className='error-text'>{error}</p>
                <input className='btn-submit' type="submit" value="SignUp" />
            </form>
            <p>Already have an Account?<Link to='/login'>Login Here</Link></p>
        </div>
    );
};

export default SignUp;