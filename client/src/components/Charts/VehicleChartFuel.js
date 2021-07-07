import React, { useState, useEffect } from "react";
import ErrorBoundary from "../ErrorHandler/ErrorBoundary";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
import { useSelector } from "react-redux";
import AlertBar from "../Utils/AlertBar";
import Loader from "../Utils/Loader";


ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const chartConfigs = {
    type: "angulargauge",
    width: 600,
    height: 350,
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Vehicle Fuel Gauge",
            lowerLimit: "0",
            upperLimit: "100",
            showValue: "1",
            numberSuffix: "%",
            theme: "fusion",
            showToolTip: "0"
        },
        colorRange: {
            color: [
                {
                    minValue: "0",
                    maxValue: "30",
                    code: "#F2726F"
                },
                {
                    minValue: "30",
                    maxValue: "65",
                    code: "#FFC533"
                },
                {
                    minValue: "65",
                    maxValue: "100",
                    code: "#62B58F"
                }
            ]
        },
        dials: {
            dial: [
                {
                    value: "81"
                }
            ]
        }
    },
};

function VehicleChartFuel({ id }) {
    const bearerToken = useSelector((state) => state.auth.authData?.accessToken || state.auth.authData),
        initialState = {
            loading: false,
            vehicle: null,
            error: ""
        },
        [state, setState] = useState(initialState);
    useEffect(() => {
        // setting loading data to true as inside useEffect
        setState({
            ...state,
            loading: true
        })
        axios.get(`${process.env.REACT_APP_MY_API_HOST}/vehicles/${id}/fuel`, {
            headers: {
                "Content-type": `application/json; charset=utf-8`,
                "Authorization": `Bearer ${bearerToken}` //the token is a variable which holds the token
            }
        }).then(response => {
            // setting the state with the loaded data and the other keys update
            setState({
                loading: false,
                vehicle: response.data.fuel,
                error: ""
            })
        }).catch(error => {
            // setting the state with the error received while fetching data and the other keys update
            setState({
                loading: false,
                vehicle: null,
                error: error.response.data
            })
        })
        // eslint-disable-next-line
    }, [])

    chartConfigs.dataSource.dials.dial[0].value = state.vehicle?.value || 0
    return state.loading ? (
        <Loader />
    ) : state.error ? (
        <AlertBar message={state.error.message} />
    ) : (
        <ErrorBoundary >
            <ReactFC {...chartConfigs} />
            <span className="badge badge-info">Timestamp: {state.vehicle?.timestamp}</span>{' '}
        </ErrorBoundary>
    );
}


export default VehicleChartFuel