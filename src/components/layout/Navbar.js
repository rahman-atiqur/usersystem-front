/* Implemented by Atiqur Rahman */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddUser } from "../users/AddUser";

const Navbar = () => {
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

                    <Link className="btn btn-outline-light" to="/adduser">
                        Add User
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
