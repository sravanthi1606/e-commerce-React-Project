import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../Redux/Action/Action";
import Footer from "../Components/Footer"
import { toast } from "react-toastify";
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { NavLink } from "react-router-dom";


const CheckOut = () => {
    const [orderPlaced, setOrderPlaced] = useState(false);
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

    const placeOrder = () => {
        dispatch(clearCart());
        setOrderPlaced(true)
        toast.success("Placed Order Successfully!");
    }


    return (
        <div>
            <NavLink to="/cart" className="btn  go_back"><FaArrowAltCircleLeft size={30} /></NavLink>
            
            {cart && cart.length > 0 && (cart.map((products) => (

                <div>
                    <div className="container single_product" key={products.id}>
                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12" >
                                <img src={products.image} alt={products.title} height="300px" width="300px" className="single_img"></img>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 checkout_product">
                                <h1 className="single_product_title">{products.title}</h1>
                                <h6 className="single_product_category">Category - {products.category}</h6>
                                <h3 className="display-7 my-4">Quantity :{products.qty}</h3>
                                <p className="fw-bold">
                                    Total Price: {products.qty} X ${products.price} = ${products.qty * products.price}
                                </p>
                            </div>
                        </div>
                    </div>
                    <br></br><br></br>
                </div>

            )))
            }
            {cart.length > 0 && !orderPlaced && (
                <>
                    <div className="totalPrice">
                        <h4>Total Price </h4>
                        <h4 className=" font-bold">${totalAmount}</h4>
                    </div>
                    <div className="totalPrice">
                        <h4 >Total Discounts</h4>
                        <h4 className="text-2xl font-bold">$32</h4>
                    </div>

                    <hr></hr>
                    <div className="totalPrice">
                        <h2 >Order Total</h2>
                        <h2 className="text-2xl font-bold">${totalAmount + 32}</h2>
                    </div>

                    <br></br>
                    <div className="place_orders">
                        <button onClick={placeOrder} className="place_order">Place Order</button>

                    </div>
                </>
            )}

            {orderPlaced && (
                <div className="orderPlacedMessage">
                    <h3>Your order has been placed!</h3>
                    <h3>It will be Deliver within 7 days</h3>
                </div>
            )}

            <Footer />
        </div>
    )

}
export default CheckOut