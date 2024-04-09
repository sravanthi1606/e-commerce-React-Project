import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { delCart, decrementQuantity, incrementQuantity, setErrorMessage, clearCart } from "../Redux/Action/Action";
import { Link, NavLink } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { FaArrowAltCircleLeft } from "react-icons/fa"


const Cart = () => {
    const cart = useSelector((state) => state.CartPage.cart);

    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {

        let total = 0;
        cart.forEach((product) => {
            total += product.qty * product.price;
        });
        setTotalAmount(total);


        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleRemoveFromCart = (productId) => {
        dispatch(delCart(productId));
        toast.success("Removed an item from cart")
    };

    const handleIncrementQuantity = (productId) => {

        const productToIncrement = cart.find((product) => product.id === productId);
        if (productToIncrement && productToIncrement.qty < productToIncrement.Originalqty) {
            dispatch(incrementQuantity(productId));
        }

        else {
            dispatch(setErrorMessage(toast.warn("Hurry up limited stock available !!")))
        }
    }

    const handleDecrementQuantity = (productId) => {
        dispatch(decrementQuantity(productId));
    }

    const handleClearCart = () => {
        dispatch(clearCart())
        console.log(dispatch(clearCart()));;
        toast.success("Cart cleared successfully!");
    }


    return (
        <div>

            <div className="user_navbars">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 ">
                            <Link to="/cart" className='nav_item_cart'>Cart <FaCartArrowDown /> ({cart.length})</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <NavLink to="/home" className="btn  go_back"><FaArrowAltCircleLeft size={30} /></NavLink>
                <button className='nav_item_carts clear-cart' onClick={handleClearCart}>Clear Cart</button>
            </div>


            <h4 className="cart_head">Shopping Cart items</h4>
            {cart && cart.length > 0 ? (cart.map((products) => (

                <div className="container " key={products.id}>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12" >
                            <img src={products.image} alt={products.title} className="admin_image"></img>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h1 className="single_product_title">{products.title}</h1>
                            <h6 className="single_product_category">Category - {products.category}</h6>
                            <span className="fw-bold">Quantity :</span>
                            <button className="incdec_btn" onClick={() => handleDecrementQuantity(products.id)} disabled={products.qty === 1}>-</button>
                            <span>{products.qty}</span>
                            <button className="incdec_btn" onClick={() => handleIncrementQuantity(products.id)} disabled={products.qty === products.Originalqty}>+</button>
                            <p className="fw-bold">
                                Total Price: {products.qty} X ${products.price} = ${products.qty * products.price}
                            </p>
                            <button className="remove_btn" onClick={() => handleRemoveFromCart(products)}>Remove</button>
                        </div>
                    </div>
                    <hr></hr>
                </div>

            ))) : (<h3 className="cart_empty">Your Cart is Empty <br></br> Go to products and add products to cart</h3>)}



            {
                cart && cart.length > 0 && (
                    <>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <NavLink to='/checkout' className="checkout">CheckOut</NavLink>
                                </div>
                            </div>
                        </div>

                        <div className="totalPrice">
                            <h2>Total Price </h2>
                            <h2 className="text-2xl font-bold">${totalAmount}</h2>
                        </div>
                    </>

                )
            }

            <Footer />
        </div>
    )
}
export default Cart;