import React, { useState, useEffect } from "react";
import axios from "axios";
import VehicleChartFuel from "../Charts/VehicleChartFuel";
import VehicleChartOdometer from "../Charts/VehicleChartOdometer";
import ErrorBoundary from "../ErrorHandler/ErrorBoundary";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AlertBar from "../Utils/AlertBar";
import Loader from "../Utils/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0.5,
    margin: "5vh",
    square: false,
  },
  paper: {
    // padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    textAlign: "left",
    marginTop: "4vh",
    padding: "3vh",
  },
}));
function VehicalDetails(props) {
  const bearerToken = useSelector(
      (state) => state.auth.authData?.accessToken || state.auth.authData
    ),
    { id } = props.match.params,
    classes = useStyles(),
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
      .get(`${process.env.REACT_APP_MY_API_HOST}/vehicles/${id}`, {
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
  let { vehicle } = state;
  return state.loading ? (
    <Loader />
  ) : state.error ? (
    <AlertBar message={state.error.message} />
  ) : (
    <ErrorBoundary>
      {vehicle !== undefined && vehicle !== null && (
        <React.Fragment>
          <div className={classes.root}>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <Paper
                  className={classes.paper}
                  elevation={3}
                  variant="outlined"
                  square
                >
                  <Grid container>
                    <Grid item md={4} sm={6} xs={8}>
                      <Typography className="text-capitalize">
                        {" "}
                        License Plate: {vehicle.licenseplate}
                      </Typography>
                      <Typography className="text-capitalize">
                        {" "}
                        Finorvin: {vehicle.finorvin}
                      </Typography>
                      <Typography className="text-capitalize">
                        Model Year: {vehicle.modelyear}
                      </Typography>
                      <Typography className="text-capitalize">
                        {" "}
                        Color: {vehicle.colorname}
                      </Typography>
                      <Typography className="text-capitalize">
                        {" "}
                        Fuel Type: {vehicle.fueltype}
                      </Typography>
                    </Grid>
                    <Grid item md={4} sm={6} xs={8}>
                      <Typography className="text-capitalize">
                        Power HP: {vehicle.powerhp}
                      </Typography>
                      <Typography className="text-capitalize">
                        Power KW:{vehicle.powerkw}
                      </Typography>
                      <Typography className="text-capitalize">
                        Number of Doors: {vehicle.numberofdoors}
                      </Typography>
                      <Typography className="text-capitalize">
                        Number of Seats: {vehicle.numberofseats}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid container>
                <Grid item md={6} xs={12} align="center">
                  <VehicleChartFuel id={vehicle._id} />
                </Grid>
                <Grid item md={6} xs={12} align="center">
                  <VehicleChartOdometer id={vehicle._id} />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      )}
    </ErrorBoundary>
  );
}

export default VehicalDetails;
