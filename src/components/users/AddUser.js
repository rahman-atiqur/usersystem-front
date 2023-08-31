/* Implemented by Atiqur Rahman */
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddUser = ({ changeMessage }) => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });
    const [error, setError] = useState(false);
    const ROOT_URL = "http://springboot-app-3-env.eba-6itjfmwd.us-east-2.elasticbeanstalk.com";

    //Deconstruct
    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    const onFormSubmit = async (e) => {
        e.preventDefault();

        if (name.length === 0 || username.length === 0 || email.length === 0) {
            setError(true);
        } else {
            await axios.post(ROOT_URL + "/user/add", user);

            changeMessage("New record added successfully!!");

            navigate("/");
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4 text-primary">Register User</h2>
                    <form onSubmit={(e) => onFormSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                            {error && user.name.length <= 0 ? (
                                <label className="text-danger">Name can&apos;t be empty!</label>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username.toLocaleLowerCase()}
                                onChange={(e) => onInputChange(e)}
                            />
                            {error && user.username.length <= 0 ? (
                                <label className="text-danger">
                                    User name can&apos;t be empty!
                                </label>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"email"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                            {error && user.email.length <= 0 ? (
                                <label className="text-danger">E-mail can&apos;t be empty!</label>
                            ) : (
                                ""
                            )}
                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link className="btn btn-outline-danger mx-2" to="/">
                            Cancel
                        </Link>
                        {/* {success ? <label className="text-danger">Success!!</label> : ""} */}
                    </form>
                </div>
            </div>
        </div>
    );
};
