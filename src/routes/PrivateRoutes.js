import React, { useContext } from 'react';
import { AuthContext } from '../components/Contexts/UserContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading){
        return <div>Loading........</div>  // prevent redirect to login page after browser reloaded
    }

    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};
//module 59-8 After Login Redirect Navigate to the right route state={{from: location}} replace 

export default PrivateRoutes;