import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa"
import { FaStar } from "react-icons/fa6";
import { addToWishlist, removeFromWishlist } from "../Redux/Action/Action";
import { Button } from "react-bootstrap";


const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const productList = useSelector((state) => state.ProductPage.products)

  const dispatch=useDispatch()


  const findProductById = (productId) => {
    return productList.find((product) => product.id === productId);
  };

  const handleAddToWishlist = (productId) => {
    if (wishlist.includes(productId)) {
        dispatch(removeFromWishlist(productId));
    } else {
        dispatch(addToWishlist(productId));
    }
};

  return (
    <div>

      <NavLink to="/home" className="btn  go_back"><FaArrowAltCircleLeft size={30} /></NavLink>


      {wishlist && wishlist.length > 0 ?
        wishlist.map((productId) => {
          const product = findProductById(productId);


          return (

            <div className="container single_product" key={productId.id}>
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12" >
                  <img src={product.image} alt={product.title} height="300px" width="300px" className="single_img"></img>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <br></br>
                  <h1 className="single_product_title">{product.title}</h1>
                  <h6 className="single_product_category">Category - {product.category}</h6>
                  <h3 className="display-7 my-4">Quantity :{product.qty}</h3>
                  <h6 className="display-7 fw-bold my-4">Price ${product.price}</h6>
                  <p className="single_product_rating">Rating  <FaStar />{product.rating}</p>
                  <Button onClick={() => handleAddToWishlist(product.id)}>Remove From Whislist</Button>
                                                
                </div>
              </div>
            </div>
          )
        }): (<h3 className="cart_empty">No product has added to Wishlist</h3>)
      }
      <Footer />
    </div>
  )
}
export default Wishlist;