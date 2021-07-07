import React, { useState, useEffect } from "react"
import axios from "axios";
import ErrorBoundary from "../ErrorHandler/ErrorBoundary";
import VehicleCard from "./VehicleCard";
import { useSelector } from "react-redux";
import AlertBar from "../Utils/AlertBar";
import Loader from "../Utils/Loader";


function VehiclesList() {
    const bearerToken = useSelector((state) => state.auth.authData?.accessToken || state.auth.authData),
        initialState = {
            loading: false,
            vehicles: [],
            error: ""
        },
        [state, setState] = useState(initialState);
    useEffect(() => {
        // setting loading data to true as inside useEffect
        setState({
            ...state,
            loading: true
        })
        axios.get(`${process.env.REACT_APP_MY_API_HOST}/vehicles`, {
            headers: {
                "Content-type": `application/json; charset=utf-8`,
                "Authorization": `Bearer ${bearerToken}` //the token is a variable which holds the token
            }
        }).then(response => {
            // setting the state with the loaded data and the other keys update
            setState({
                loading: false,
                vehicles: response.data,
                error: ""
            })
        }).catch(error => {
            // setting the state with the error received while fetching data and the other keys update
            setState({
                loading: false,
                vehicles: [],
                error: error.response.data
            })
        })
        // eslint-disable-next-line 
    }, [])
    return state.loading ? (
        <Loader />
    ) : state.error ? (
        <AlertBar message={state.error.message} />
    ) : (
        <ErrorBoundary>
            <div>
                {state.vehicles !== undefined &&
                    state.vehicles !== [] &&
                    state.vehicles.map(vehicle => (
                        <React.Fragment key={vehicle._id} >
                            <VehicleCard vehicle={vehicle} />
                        </React.Fragment>
                    )
                    )}
            </div>
        </ErrorBoundary>
    )
}

export default VehiclesList
