import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import ErrorBoundary from "./ErrorHandler/ErrorBoundary";
import Navbar from "./Headers/Navbar";
import Login from "./Login/index"
import Homepage from "./Homepage";
import VehicleDetails from "./Vehicles/VehicalDetails";


function AppRoutes() {
    return (
        <Fragment>
            <Navbar />
            <Switch>
                <ErrorBoundary >
                    {/* route which can be accessed publicly */}
                    <Route path="/login" exact component={Login} />
                    {/* making these routes authenticated */}
                    <div>
                        <Route path="/" exact component={Homepage} />
                        <Route path="/vehicles/:id" exact component={VehicleDetails} />
                    </div>

                </ErrorBoundary>
            </Switch>
        </Fragment>
    )
}

export default AppRoutes
