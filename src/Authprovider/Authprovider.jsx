/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../Firebase/firebase.config";


 export const AuthContext =createContext();
const auth = getAuth(app)

const Authprovider = ({children}) => {



    const googleProvider= new GoogleAuthProvider();
    const googleSignin=(value)=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
       }


    const [user ,setUser ]=useState(null);
    const [loading,setLoading]=useState(true);


    const createUser =(email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signIn =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logout =()=>{
        setLoading(true);
        return signOut(auth);
    }


useEffect(()=>{
   const unsubcribe = onAuthStateChanged(auth,currentUser =>{
        setUser(currentUser)
        console.log('current user ', currentUser)
        setLoading(false)
    });
    return ()=>{
        unsubcribe();
    }
},[])


    const authinfo ={
        user,
        loading,
        createUser,
        signIn,
        logout,
        googleSignin

    }




    return (
        <AuthContext.Provider value={ authinfo}>
{
    children
}
        </AuthContext.Provider>
    );
};

export default Authprovider;