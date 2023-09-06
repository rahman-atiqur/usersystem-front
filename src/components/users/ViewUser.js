/* Implemented by Atiqur Rahman */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const ViewUser = ({ changeMessage }) => {
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
    });

    const { id } = useParams();
    const ROOT_URL = "http://springboot-app-3-env.eba-6itjfmwd.us-east-2.elasticbeanstalk.com";

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(ROOT_URL + `/user/${id}`);
        setUser(result.data);
        changeMessage("Ready to add new data");
    };

    //deconstructing
    const { name, username, email } = user;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4 text-primary">User Details</h2>

                    <div className="card">
                        <div className="card-header fs-4">
                            <b>User Id : </b>
                            {id}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Name : </b>
                                    {name}
                                </li>
                                <li className="list-group-item">
                                    <b>Username : </b>
                                    {username}
                                </li>
                                <li className="list-group-item">
                                    <b>Email : </b>
                                    {email}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-outline-primary my-2" to={"/"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
