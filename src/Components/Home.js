import React from "react";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import { NavUserContext } from "./RouterComponents";
import  { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

const Home = ()=>{
    const isAdmin =sessionStorage.getItem("admin");


    const { setIsAuth } = useContext(NavUserContext);
    const navigate=useNavigate();


    useEffect(() => {
        const isAdminLoggedIn = sessionStorage.getItem("admin") !== null;
        const isUserLoggedIn = sessionStorage.getItem("user") !== null;
        if (isAdminLoggedIn || isUserLoggedIn) {
            setIsAuth(true);
            if (isAdminLoggedIn) {
                navigate("/home");
            } else {
                navigate("/home");
            }
        }
    }, [navigate, setIsAuth]);
 
    return(
        <div>
           {
               isAdmin ? (<AdminHome/>):(<UserHome/>)
           }
         </div>
    )
}
export default Home;