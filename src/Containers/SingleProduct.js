import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Redux/Action/Action";
import { FaStar } from "react-icons/fa6";
import Footer from "../Components/Footer"
import { toast } from "react-toastify";
import { fetchProduct } from "../Redux/Action/Action";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";


const SingleProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector((state) => state.SingleProduct.products);

    const cart = useSelector((state) => state.CartPage?.cart || []);


    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);


    const isInCart = cart.some(item => item.id === productList.id);
    const [addToCartBtn, setAddToCartBtn] = useState(true);


    const addProduct = () => {
        setAddToCartBtn(!addToCartBtn)
        if (addToCartBtn) {
            dispatch(addCart(productList));
            toast.success('Product is added to cart')
        }
    }


    const ShowProduct = () => {
        return (
            <div>
                <div className="container single_product" key={productList.id}>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12" >
                            <img src={productList.image} alt={productList.title} height="300px" width="300px" className="single_img"></img>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h1 className="single_product_title">{productList.title}</h1>
                            <p className="single_product_desc">{productList.description}</p>
                            <h6 className="single_product_category">Category - {productList.category}</h6>
                            <h3 className="display-7 my-4">Quantity :{productList.qty}</h3>
                            <h6 className="display-7 fw-bold my-4">Price ${productList.price}</h6>
                            <p className="single_product_rating">Rating  <FaStar />{productList.rating}</p>


                            {isInCart ?
                                <button
                                    className="add_go_cart"
                                    onClick={() => navigate('/cart')}
                                >
                                    Go to Cart
                                </button>
                                :
                                <button
                                    className="add_go_cart"
                                    onClick={addProduct}
                                >
                                    Add to Cart
                                </button>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }



    return (

        <div>
            <div className="user_navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart_nav">
                                <button><Link to="/product" className='user_nav_item'>All Products</Link></button>
                                <Link to="/cart" className='nav_item_cart'>Cart <FaCartArrowDown /> ({cart.length})</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container py-5">
                <div className="row py-4">
                    {<ShowProduct />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SingleProduct;







