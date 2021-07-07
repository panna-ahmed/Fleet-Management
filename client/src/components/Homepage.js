import React from "react";
import { useSelector } from "react-redux";
import VehiclesList from "./Vehicles/VehiclesList";
import ErrorBoundary from "./ErrorHandler/ErrorBoundary";
import { useHistory } from "react-router-dom";


function Homepage() {
    const authData = useSelector((state) => state.auth.authData);
    const history = useHistory();
    const onLoginClick = () => {
        history.push("/login")
    }
    return (
        <ErrorBoundary>
            <div className="container">
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4">Mercedes-Benz Vehicles API </h1>
                        <p className="lead">Exclusive reports and current films: experience a broad range of topics from the fascinating world of Mercedes-Benz. To find out about offers in your location, please go to the local Mercedes-Benz website.</p>
                    </div>
                </div>
                {authData ? (
                    <VehiclesList />
                ) : (
                    <h1 onClick={onLoginClick}>Signin to view List of Vehicles</h1>
                )}
            </div>
        </ErrorBoundary>
    )
}

export default Homepage
