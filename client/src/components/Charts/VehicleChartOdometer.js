import React, { useState, useEffect } from "react";
import ErrorBoundary from "../ErrorHandler/ErrorBoundary";
import FusionCharts from "fusioncharts";
import Widgets from "fusioncharts/fusioncharts.widgets";
import ReactFC from "react-fusioncharts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../Utils/Loader";
import AlertBar from "../Utils/AlertBar";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

const chartConfigs = {
  type: "angulargauge",
  width: 600,
  height: 400,
  dataFormat: "json",
  dataSource: {
    chart: {
      caption: "Vehicle Odometer ",
      captionpadding: "20",
      origw: "320",
      origh: "300",
      gaugeouterradius: "115",
      gaugestartangle: "270",
      gaugeendangle: "-25",
      showvalue: "0",
      valuefontsize: "30",
      majortmnumber: "13",
      majortmthickness: "2",
      majortmheight: "13",
      minortmheight: "7",
      minortmthickness: "1",
      minortmnumber: "1",
      showgaugeborder: "1",
      theme: "fusion",
    },
    colorrange: {
      color: [
        {
          minvalue: "0",
          maxvalue: "110",
          code: "#999999",
        },
        {
          minvalue: "110",
          maxvalue: "280",
          code: "#F6F6F6",
        },
      ],
    },
    dials: {
      dial: [
        {
          value: "0",
          bgcolor: "#F20F2F",
          basewidth: "8",
        },
      ],
    },
    annotations: {
      groups: [
        {
          items: [
            {
              type: "text",
              id: "text",
              text: "mph",
              x: "$gaugeCenterX",
              y: "$gaugeCenterY + 40",
              fontsize: "20",
              color: "#555555",
            },
          ],
        },
      ],
    },
  },
};

function VehicleChartOdometer({ id }) {
  const bearerToken = useSelector(
      (state) => state.auth.authData?.accessToken || state.auth.authData
    ),
    initialState = {
      loading: false,
      vehicle: null,
      error: "",
    },
    [state, setState] = useState(initialState);
  useEffect(() => {
    // setting loading data to true as inside useEffect
    setState({
      ...state,
      loading: true,
    });
    axios
      .get(`${process.env.REACT_APP_MY_API_HOST}/vehicles/${id}/odometer`, {
        headers: {
          "Content-type": `application/json; charset=utf-8`,
          Authorization: `Bearer ${bearerToken}`, //the token is a variable which holds the token
        },
      })
      .then((response) => {
        // setting the state with the loaded data and the other keys update
        setState({
          loading: false,
          vehicle: response.data,
          error: "",
        });
      })
      .catch((error) => {
        // setting the state with the error received while fetching data and the other keys update
        setState({
          loading: false,
          vehicle: null,
          error: error.response.data,
        });
      });
    // eslint-disable-next-line
  }, []);
  chartConfigs.dataSource.dials.dial[0].value =
    state.vehicle?.odometer?.value || 0;
  console.log(state);
  return state.loading ? (
    <Loader />
  ) : state.error ? (
    <AlertBar message={state.error.message} />
  ) : (
    <ErrorBoundary>
      <ReactFC {...chartConfigs} />
      <span className="badge badge-info">
        Timestamp: {state.vehicle?.odometer?.timestamp}
      </span>{" "}
    </ErrorBoundary>
  );
}

export default VehicleChartOdometer;
