/* Implemented by Atiqur Rahman */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddUser } from "../users/AddUser";

const Navbar = () => {
    // const [message, setMessage] = useState("Hello");
    // const changeMessage = (newMessage) => {
    //     setMessage(newMessage);
    // };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link className="btn btn-outline-light" to="/">
                        Home
                    </Link>

                    <Link className="navbar-brand" to="/">
                        Spring Boot and ReactJS for Full Stack Application
                    </Link>

                    {/* <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Search
                        </button>
                    </form> */}

                    <Link className="btn btn-outline-light" to="/adduser">
                        Add User
                    </Link>
                </div>
            </nav>

            <Link
                className="mx-3 fs-5 text-decoration-underline"
                to="http://verizon.com"
                target="_blank"
            >
                Verizon
            </Link>
        </div>
    );
};

export default Navbar;
