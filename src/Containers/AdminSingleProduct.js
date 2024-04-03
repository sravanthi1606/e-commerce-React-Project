import React, {useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import Footer from "../Components/Footer"
import {FaArrowAltCircleLeft} from "react-icons/fa"
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Redux/Action/Action";


const AdminSingleProduct = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const productList = useSelector((state) => state.SingleProduct.products);

    useEffect(() => {
        dispatch(fetchProduct(id));
    }, [dispatch, id]);

    const ShowProduct = () => {
        return (
            <div>

                <div className="container single_product" key={productList.id}>
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12" >
                            <img src={productList.image} alt={productList.title}  className="admin_image"></img>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <h1 className="single_product_title">{productList.title}</h1>

                            <p className="single_product_desc">{productList.description}</p>
                            <h6 className="single_product_category">Category - {productList.category}</h6>
                            <h6 className="display-7 fw-bold my-4">Price ${productList.price}</h6>
                            <p className="single_product_rating">Rating  <FaStar />{productList.rating}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <NavLink to="/home" className="btn  go_back"><FaArrowAltCircleLeft size={30}/></NavLink>
            <div className="container py-5">
                <div className="row py-4">
                    {<ShowProduct/>}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default AdminSingleProduct;
