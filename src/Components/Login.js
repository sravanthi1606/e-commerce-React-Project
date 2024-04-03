import React, { useContext, useState } from "react";
import { NavUserContext } from "./RouterComponents";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

const LoginForm = () => {
    const [emailText, setEmailText] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg, setErrorMsg] = useState('');

    const { setIsAuth } = useContext(NavUserContext);
    const navigate = useNavigate();

    const handleEmail = (event) => {
        setEmailText(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (emailText === "" || password === "") {
            setErrorMsg("Please provide both Email and Password");
            toast.error("Enter Valid Emali and Password")

        }
        else if (emailText === "user@gmail.com" && password === "user") {
            setErrorMsg("");
            sessionStorage.setItem("user", emailText);
            setIsAuth(true)
            navigate("/home")
            toast.success("Successfully logged in !!")

        }
        else if (emailText === "admin@gmail.com" && password === "admin") {
            setErrorMsg("");
            sessionStorage.setItem("admin", emailText);
            setIsAuth(true)
            navigate("/home")
            toast.success("Successfully logged in !!")
        }
        else {
            setErrorMsg(" Wrong Email/ Paswword  ");
            toast.error("Enter Valid Emali and Password")

        }
    }


    const handleUserSignIn = () => {
        sessionStorage.setItem("user", "user@gmail.com");
        setIsAuth(true)
        navigate("/userhome");
    }

    const handleAdminSignIn = () => {
        sessionStorage.setItem("admin", "admin@gmail.com");
        setIsAuth(true)
        navigate("/adminhome");
    }

    return (
        <div>
            <div className="form_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <div class="form_information">
                                <div class="form_info">
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="emailText" class="label1">Email : </label><br />
                                        <input type="text"
                                            className="form-control"
                                            id="emailText"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter email"
                                            value={emailText}
                                            onChange={handleEmail}></input><br />
                                        <label htmlFor="password" class="label1">Password : </label><br />
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={handlePassword}
                                        /><br />
                                        <button type="submit" id="submit">Submit</button>
                                    </form>
                                    <h3 className="text-center"> Or <br></br>Continue as</h3>
                                    <Button onClick={handleUserSignIn} id="guest"> User Guest</Button>
                                    <Button onClick={handleAdminSignIn} id="guest"> Admin Guest</Button>
                                    <p className="note">NOTE: For Login as User use email : user@gmail.com and password:user <br />
                                        For Login as Admin use email : admin@gmail.com and password:admin</p>
                                        {errormsg && <h1>{errormsg}</h1>}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginForm;