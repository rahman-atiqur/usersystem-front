/* Developed by Atiqur Rahman */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";

export const Home = ({ message, changeMessage }) => {
    const [users, setUsers] = useState([]);
    const [alert, setAlert] = useState(true);
    const [query, setQuery] = useState("");
    const ROOT_URL = "http://springboot-app-3-env.eba-6itjfmwd.us-east-2.elasticbeanstalk.com";

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get(ROOT_URL + "/user/getAll");
        setUsers(result.data);
        const timer = setTimeout(() => {
            setAlert(false);
        }, 3000);
    };
    const deleteUser = async (id) => {
        await axios.delete(ROOT_URL + `/user/${id}`); //it works for single id or array of ids
        changeMessage(`Deleted record${id.length > 1 ? `s` : ``}: ${id}`);
        // setQuery("");
        setChecked([]);
        setAlert(true);
        loadUsers();
    };

    // Search and filter
    const keys = ["username", "name", "email"];
    const search = (data) => {
        if (query.length > 1) {
            return data.filter(
                (d) => keys.some((key) => d[key].toLowerCase().includes(query))
                // user.name.toLowerCase().includes(query) ||
                // user.username.toLowerCase().includes(query) ||
                // user.email.toLowerCase().includes(query)
            ); //using searching column
        } else {
            return data; //return all users
        }
    };

    const handleCheckAllChange = (e) => {
        setChecked(e.target.checked ? search(users).map((item) => item.id) : []);
    };

    const [checked, setChecked] = useState([]);

    const handleCheckBox = (id) => () => {
        setChecked((prev) => {
            if (prev.includes(id)) {
                return prev.filter((x) => x !== id);
            } else {
                return [...prev, id];
            }
        });

        // console.log("checked", checked);
    };

    const addFake = async () => {
        const fName = faker.person.firstName();
        const lName = faker.person.lastName();

        const fakeUser = {
            name: fName + " " + lName,
            username: faker.internet.userName().toLowerCase(),
            email: fName.toLowerCase() + "@fakemail.com",
        };

        // const fakeUser = {
        //     name: "Atiqur Rahman",
        //     username: "atiq",
        //     email: "atiqbit@gmail.com",
        // };

        await axios.post(ROOT_URL + "/user/add", fakeUser);
        changeMessage(`A fake data is added`);
        // setChecked([]);
        setAlert(true);
        loadUsers();
    };

    return (
        <div className="container py-2">
            <div className="py-4">
                <h2 className="text-center text-success fs-3">User List</h2>

                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    onChange={(e) => {
                        setQuery(e.target.value.toLocaleLowerCase());
                        setChecked([]);
                    }}
                />

                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">Sl.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>

                            {query.length > 1 && search(users).length !== 0 && (
                                <th>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="selectAll"
                                        name="selectAll"
                                        checked={checked.length === search(users).length}
                                        onChange={handleCheckAllChange}
                                    />
                                    <span className="text-success">&nbsp;&nbsp;Select All</span>
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {search(users).map((user, index) => {
                            const { id, name, username, email } = user;
                            return (
                                <tr key={id}>
                                    <th>{index + 1}</th>
                                    <td>{name}</td>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>
                                        <Link
                                            className="btn btn-primary mx-2"
                                            to={`/viewuser/${id}`}
                                        >
                                            View
                                        </Link>
                                        <Link
                                            className="btn btn-outline-primary mx-2"
                                            to={`/edituser/${id}`}
                                        >
                                            Edit
                                        </Link>
                                        {query.length === 0 || query.length < 2 ? (
                                            <button
                                                className="btn btn-danger mx-2"
                                                onClick={() => deleteUser(id)}
                                            >
                                                Delete
                                            </button>
                                        ) : (
                                            <>
                                                <button className="btn btn-secondary mx-2" disabled>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </td>

                                    {query.length > 1 && (
                                        <td>
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={id}
                                                name="contactId"
                                                value={id}
                                                // checked={!checkAll ? true : false}
                                                onChange={handleCheckBox(id)}
                                                checked={checked.includes(id)}
                                            />
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                        <tr>
                            {/* <td colSpan={5}>A</td> */}
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="btn text-secondary" onClick={() => addFake()}>
                                    Add a fake data
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* {alert && <label className="text-danger">{message}</label>} */}

                {alert && (
                    <div className="alert alert-danger alert-dismissible" role="alert">
                        <button
                            className="btn-close"
                            data-bs-dismiss="alert"
                            aria-label="Close"
                        ></button>
                        {message}
                    </div>
                )}
            </div>
            <div>
                {query.length > 1 && (
                    <>
                        {search(users).length > 0 && (
                            <>
                                <label className="text-success">
                                    Filtered data {search(users).length > 1 ? `are` : `is`} shown
                                    above.
                                </label>
                                <br />

                                <br />
                                {checked.length > 0 && (
                                    <>
                                        <label className="text-success">
                                            Selected Record{checked.length > 1 ? `s` : ``}: [
                                            {checked.join(", ")}]
                                        </label>
                                        <br />
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(checked)}
                                        >
                                            Delete selected
                                        </button>
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>

            {/* <div className="py-4" fs-6>
                <label className="text-secondary">Source code:</label>
                <br />
                <label className="text-secondary">Spring Boot - Back End:</label> */}

            {/* <Link
                    className="mx-3 text-decoration-underline"
                    to="https://github.com/rahman-atiqur/usersystem-back"
                    target="_blank"
                >
                    https://github.com/rahman-atiqur/usersystem-back
                </Link>
                <br />
                <label className="text-secondary">ReactJS - Front End:</label>
                <Link
                    className="mx-3 text-decoration-underline"
                    to="https://github.com/rahman-atiqur/usersystem-front"
                    target="_blank"
                >
                    https://github.com/rahman-atiqur/usersystem-front
                </Link> */}
            {/* </div> */}
        </div>
    );
};
