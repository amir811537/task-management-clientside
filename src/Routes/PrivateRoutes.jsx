/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";



const PrivateRoutes = ({children}) => {
   const {user,loading}=useContext(AuthContext);
   const location = useLocation();
   if(loading){
    return <span className="loading loading-spinner text-error"></span>
   }
   if(user){
    return children;
   }
   return <Navigate state={{from:location}} replace  to="/login"></Navigate>
};

export default PrivateRoutes;