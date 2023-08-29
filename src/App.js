/* Developed by Atiqur Rahman */

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/layout/Navbar";
import { Home } from "./components/pages/Home";
import { AddUser } from "./components/users/AddUser";
import { EditUser } from "./components/users/EditUser";
import { ViewUser } from "./components/users/ViewUser";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import React, { useState } from "react";

function App() {
    const [message, setMessage] = useState("Ready to add new data");
    const changeMessage = (newMessage) => {
        setMessage(newMessage);
    };
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Home message={message} changeMessage={changeMessage} />}
                    />
                    <Route
                        exact
                        path="/adduser"
                        element={<AddUser changeMessage={changeMessage} />}
                    />
                    <Route
                        exaact
                        path="/edituser/:id"
                        element={<EditUser changeMessage={changeMessage} />}
                    />
                    <Route
                        exact
                        path="/viewuser/:id"
                        element={<ViewUser changeMessage={changeMessage} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
