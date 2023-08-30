/* Implemented by Atiqur Rahman */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditUser = ({ changeMessage }) => {
    let navigate = useNavigate();

    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });
    const [error, setError] = useState(false);
    const [flg, setFlg] = useState(true);
    const ROOT_URL = "http://springboot-app-3-env.eba-6itjfmwd.us-east-2.elasticbeanstalk.com";
    const { name, username, email } = user;

    useEffect(() => {
        loadUsers();
    }, []);

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (name.length === 0 || username.length === 0 || email.length === 0) {
            setError(true);
            setFlg(true);
        } else {
            await axios.put(ROOT_URL + `/user/${id}`, user);
            changeMessage("Updated successfully!!");
            navigate("/");
        }
    };

    const loadUsers = async () => {
        const result = await axios.get(ROOT_URL + `/user/${id}`);
        setUser(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4 text-primary">Edit User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="id" className="form-label fs-5">
                                User id: {id}
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                autoFocus={flg}
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
                            <label htmlFor="Username" className="form-label">
                                Username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                // autoFocus={flg}
                                value={username}
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
                            <label htmlFor="Email" className="form-label">
                                E-mail
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your e-mail address"
                                name="email"
                                // autoFocus={flg}
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
                    </form>
                </div>
            </div>
        </div>
    );
};
