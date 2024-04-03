import React, { createContext, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import Navbar from "./Navbar";
import AdminHome from "./AdminHome";
import UserHome from "./UserHome";
import Product from "./Products";
import SingleProduct from "../Containers/SingleProduct";
import Cart from "./Cart";
import EditProductList from "../Containers/EditProduct";
import Modaladd from "../Containers/Modal";
import AdminSingleProduct from "../Containers/AdminSingleProduct";
import Wishlist from "../Containers/WishList"
import CheckOut from "../Containers/CheckOut"


export const NavUserContext = createContext(null);

const RouterComponent = () => {

    const isAdminLoggedIn = sessionStorage.getItem("admin") !== null;
    const isUserLoggedIn = sessionStorage.getItem("user") !== null;
    const [isAuth, setIsAuth] = useState(isAdminLoggedIn || isUserLoggedIn);

    const usercontext = { isAuth, setIsAuth };

    return (
        <>
            <NavUserContext.Provider value={usercontext}>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        {
                            isAuth? (
                                <> 
                                    <Route path="/home" element={<Home />}></Route>
                                    <Route path="/userhome" element={<UserHome />}></Route>
                                    <Route path="/adminhome" element={<AdminHome />}></Route>
                                    <Route path='/modaladd' element={<Modaladd />}></Route>
                                    <Route path='/product' element={<Product />}></Route>
                                    <Route path='/products/:id' element={<SingleProduct />}></Route>
                                    <Route path='/product/:id' element={<AdminSingleProduct />}></Route>
                                    <Route path='/cart' element={<Cart />}></Route>
                                    <Route path='/edit/:id' element={<EditProductList />}></Route>
                                    <Route path='/wishlist' element={<Wishlist />}></Route>
                                    <Route path="/checkout" element={<CheckOut/>}></Route>


                                </>
                            ):(<Route path='*' element={<Login />}></Route>)
                        }
                    </Routes>

                </BrowserRouter>
            </NavUserContext.Provider>
        </>
    )
}
export default RouterComponent;
