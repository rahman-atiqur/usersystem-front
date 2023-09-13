/* Implemented by Atiqur Rahman */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-only-transparent-png.png";

const Navbar = () => {
    return (
        <div className="container py-4">
            {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> */}
            {/* <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
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
            </nav> */}
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <div className="col-lg-4">
                        <Link href="#" className="navbar-brand" to="/">
                            <img src={logo} alt="logo" width={50} height={50} />
                        </Link>
                        <Link className="navbar-brand" to="/">
                            <span className="fs-3">User System</span>
                            <span className="text-info">
                                &nbsp;&nbsp;- Spring Boot and ReactJS - Ver 1.02
                            </span>
                        </Link>
                    </div>

                    <div className="div-lg-8">
                        <Link className="btn btn-outline-light mx-2" to="/">
                            Home
                        </Link>

                        <Link className="btn btn-outline-light mx-2" to="/adduser">
                            Add User
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
