import React, { useContext ,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavUserContext } from './RouterComponents';
import { AiOutlineLogout } from "react-icons/ai";
import logo_img from "../Assets/Login/logo_img.png"
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Navbar = () => {

    const [show, setShow] = useState(false);

    const { isAuth, setIsAuth } = useContext(NavUserContext);
    const navigate = useNavigate();

    const handleClose = () => {
        if (isAuth) {
            navigate("/home");
        }
        setShow(false);
    };
    const handleShow = () => setShow(true);
    

    const handleLogout = () => {
        handleShow();
    };

    const handleLogoutConfirm = () => {
        if (isAuth) {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("admin");
            setIsAuth(false);
        }
        navigate("*");
        toast.success("Successfully Logged Out !!");
        setShow(false);
    };

    const handleNo = () => {
        handleClose();
        if (isAuth) {
            navigate("/home");
        }
    };


    return (
        <div className='navsection'>
            <div className='navbar'>
                <div className='image_home'>
                    <div>
                    <img src={logo_img} className='logo_img'></img>
                    </div>
                   <div>
                   {
                        isAuth && (
                            <Link to="/home" className='nav_items'>Home</Link>
                        )

                    }
                   </div>

                </div>
                <div>
                    <Link to="*" className='nav_items1' onClick={handleLogout}>
                        {isAuth ? <button>Sign Out <AiOutlineLogout /></button> : ""}
                    </Link>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to log out?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleLogoutConfirm}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleNo}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
export default Navbar;