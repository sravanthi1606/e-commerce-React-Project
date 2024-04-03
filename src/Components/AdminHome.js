import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, DeleteProducts } from "../Redux/Action/Action";
import Table from "react-bootstrap/Table"
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Modaladd from "../Containers/Modal"
import EditProductList from "../Containers/EditProduct";
import Footer from "./Footer";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md"
import { FaRegEye } from "react-icons/fa6";
import { toast } from "react-toastify";
import { NavUserContext } from "./RouterComponents";
import  { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [search, setSearch] = useState("");
    const [modals, setModals] = useState(false);
    const [editingProductId, setEditingProductId] = useState(false);

    const dispatch = useDispatch();
    const productList = useSelector((state) => state.ProductPage.products)

    const { setIsAuth } = useContext(NavUserContext);
    const navigate = useNavigate();

    useEffect(() => {

        const isAdminLoggedIn = sessionStorage.getItem("admin") !== null;
        if (isAdminLoggedIn) {
            setIsAuth(true);
            navigate("/adminhome");             
        }

        dispatch(fetchProducts())
    }, [dispatch ,navigate, setIsAuth])


    const handleDelete = async (productId) => {
        try {
            await dispatch(DeleteProducts(productId)); // Wait for deletion to complete
            dispatch(fetchProducts()); // Fetch updated product list
            toast.success("Deleted an Item !!");
        } catch (error) {
            console.error("Error deleting product:", error);
            toast.error("Failed to delete product.");
        }
    }



    let showForm = () => {
        setModals(true);
    }
    let CloseForm = () => {
        setModals(false);
    }


    const handleEdit = (productId) => {
        setEditingProductId(productId); 
    }

    const closeEditForm = () => {
        setEditingProductId(false);
    }


    return (
        <div >
            <h1 className="productlist_heading">Product List</h1>
            <div className="search_add_section">
                <input type="text" placeholder="search for product by name" value={search} onChange={(event) => setSearch(event.target.value)}></input><br></br>
                <button onClick={() => showForm()} className="dimmed-background" >Add product</button>
            </div>
            <div className="table_admin">
                <Table striped bordered hover >
                    <thead style={{ textAlign: "center" }} >
                        <tr className="table_head">
                            <th>ID</th>
                            <th>TITLE</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>QUANTITY</th>
                            <th colSpan={3}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList &&
                            productList.filter((item) => {
                                return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search)
                            })
                                .map((products) => {
                                    return (
                                        <tr key={products.id} style={{ textAlign: "left" }}>
                                            <td>{products.id}</td>
                                            <td>{products.title}</td>
                                            <td>${products.price}</td>
                                            <td>{products.category}</td>
                                            <td>{products.qty}</td>
                                            <td><Button onClick={() => handleEdit(products.id)} variant="warning"><FaEdit /></Button></td>
                                            <td><Button onClick={() => handleDelete(products.id)} variant="danger"><MdDelete /></Button></td>
                                            <td><Button><NavLink to={`/product/${products.id}`} className="text-white"><FaRegEye /></NavLink></Button></td>
                                        </tr>
                                    );
                                })}
                        {productList &&
                            productList
                                .filter((item) => {
                                    return search.toLowerCase() === "" ? item : item.title.toLowerCase().includes(search);
                                })
                                .length === 0 && (
                                <tr >
                                    <td colSpan={6} >
                                        <h1 className="text-center p-5">No products found</h1>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            </div>

            {modals && (
                <Modaladd showForm={showForm} CloseForm={CloseForm} />
            )}
            {editingProductId && (
                <EditProductList productId={editingProductId} closeForm={closeEditForm} />
            )}

            <Footer />

        </div>
    )
}
export default AdminHome;