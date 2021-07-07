import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Paper,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import * as action from "../../redux/actions/index";


const Login = () => {
  const history = useHistory(),
    dispatch = useDispatch(),
    loading = useSelector((state) => state.auth.loading),
    errors = useSelector((state) => state.auth.errors),
    paperStyle = { padding: 20, height: "50vh", width: 360 },
    btnstyle = {
      margin: "8vh 0",
      backgroundColor: "#4666d5",
      color: "white",
    },
    //set initial values of fields
    initialValues = {
      username: "",
      password: "",
    },
    // show password icon code
    [showPassword, setShowPassword] = useState(false),
    handleClickShowPassword = () => setShowPassword(!showPassword),
    handleMouseDownPassword = () => setShowPassword(!showPassword),
    // submit function of form
    onSubmit = (values, props) => {
      dispatch(action.signin(values, history))
      setTimeout(() => {
        props.resetForm();
        props.resetForm();
        props.setSubmitting(false);
      }, 2000);
    };

  return (
    <Grid>
      <Paper style={paperStyle}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit} >
          {() => (
            <Form>
              {errors && errors.message && (
                <Typography color="error" align="center" variant="h6">
                  {errors.message}
                </Typography>
              )}
              <Field
                as={TextField}
                fullWidth
                name="username"
                label="Username"
                placeholder="Enter your username"
                required
                helperText={<ErrorMessage name="username" />} />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword} >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }} />
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                style={btnstyle}
                fullWidth >
                {loading ? "Loading" : "Let's Go!"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Login;
