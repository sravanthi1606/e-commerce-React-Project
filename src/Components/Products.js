import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Action/Action";
import { FaStar } from "react-icons/fa6";
import Footer from "./Footer";
import { FaHeart } from "react-icons/fa";
import { addToWishlist, removeFromWishlist } from "../Redux/Action/Action";


const Product = () => {

    const [search, setSearch] = useState("");
    const cart = useSelector((state) => state.CartPage?.cart || []);


    const dispatch = useDispatch();
    const productList = useSelector((state) => state.ProductPage.products)
    const wishlist = useSelector((state) => state.wishlist.wishlist);


    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const [filter, setFilter] = useState(productList);

    const filterProduct = (cat) => {
        const updatedList = productList.filter((x) => x.category === cat);
        setFilter(updatedList);
    }


    const handleAddToWishlist = (productId) => {
        if (wishlist.includes(productId)) {
            dispatch(removeFromWishlist(productId));
        } else {
            dispatch(addToWishlist(productId));
        }
    };

    return (
        <div>

            <div className="user_navbar">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="cart_nav">
                                <button><Link to="/product" className='user_nav_item'>All Products</Link></button>
                                <input type="text" placeholder="  search for product by name" value={search} onChange={(event) => setSearch(event.target.value)}></input>
                                <Link to="/wishlist" className='nav_item_cart'><FaHeart style={{color:"red"}}/></Link>
                                <Link to="/cart" className='nav_item_cart'>Cart <FaCartArrowDown /> ({cart.length})</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="products_header">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center">Latest Products</h1>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>


            <div className="product_btn_links">
                <div className="buttons product_btn ">
                    <div className="btn btn-outline-info me-2 product_button" onClick={() => setFilter(productList)}>All</div>
                    <div className="btn btn-outline-info me-2 product_button" onClick={() => filterProduct("men's clothing")}>Men's Clothing</div>
                    <div className="btn btn-outline-info me-2 product_button" onClick={() => filterProduct("women's clothing")}>Women's Clothing</div>
                    <div className="btn btn-outline-info me-2 product_button" onClick={() => filterProduct("jewelery")}>Jewellery</div>
                    <div className="btn btn-outline-info me-2 product_button" onClick={() => filterProduct("electronics")}>Electronics</div>
                </div>
            </div>



            <div className="container">
                <div className="row">


                    {filter &&
                        filter.filter((item) => {
                            return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)
                        }).map((products) => {

                            return (
                                <>
                                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                                            <div className="card p-4 text-center" key={products.id}>
                                                <img src={products.image}></img>
                                                <div className="heart-icon" onClick={() => handleAddToWishlist(products.id)}>
                                                    <FaHeart color={wishlist.includes(products.id) ? "red" : "black"} />
                                                </div>
                                                <div className="card-body">
                                                    <h4 className="card-title">{products.title.substring(0, 12)}</h4>
                                                    <h5>{products.category}</h5>
                                                    <p className="card-text">${products.price}</p>
                                                    <p className="card-text"><FaStar /> {products.rating}</p>
                                                    <NavLink to={`/products/${products.id}`} className="buy_now_link">Buy Now</NavLink>
                                                </div>
                                            </div>
                                    </div>
                                </>
                            )
                        }
                        )
                    }
                    {filter &&
                        filter
                            .filter((item) => {
                                return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search);
                            })
                            .length === 0 && (
                            <div className="col-12 mt-4">
                                <h1 className="text-center p-5">No products found</h1>
                            </div>
                        )}
                </div>
            </div>

            <Footer />

        </div>
    )
}
export default Product;
