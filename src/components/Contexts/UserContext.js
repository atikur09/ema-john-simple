/* context folder ta obosshoi src er vitore components er bahire hobe  */

import React, { createContext, useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import app from '../../firebase/firebase.init';
export const AuthContext = createContext();

const auth = getAuth(app);

const UserContext = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // prevent redirect to login page after browser reloaded
    
    const createUser = (email, password) => {
        setLoading(true); // sets loader when user try to login to a private route 
        return createUserWithEmailAndPassword(auth, email, password)
    };

    const signIn = (email, password) =>{
        setLoading(true); // sets loader when user try to login to a private route 
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () =>{
        setLoading(true); // sets loader when user try to login to a private route 
        signOut(auth)
    }

    //manage existing user by using useEffect
    useEffect( ()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            console.log('current user is', currentUser);
            setUser(currentUser);
            setLoading(false);  // prevent redirect to login page after browser reloaded
        })
        // as its a observer when user goes from here need to unsubscribe/ stop the observer thats why we need to set onAuthStateChanged under a variable
        return ()=> unsubscribe();
    }, [])

    const authInfo = { user, loading, createUser, signIn, logOut };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;