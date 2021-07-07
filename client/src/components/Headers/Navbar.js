import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@material-ui/core";
import InputIcon from "@material-ui/icons/Input";
import * as actionType from "../../redux/actions/actionTypes";
import styles from "./style";
import defaultProfile from "../../images/profile.png";



const Navbar = () => {
    const classes = styles(),
        history = useHistory(),
        dispatch = useDispatch(),
        authData = useSelector((state) => state.auth.authData),
        username = authData?.user?.username || "User",
        //logout button click
        logout = () => {
            dispatch({ type: actionType.LOGOUT });
            history.push("/login");
        };
    return (
        <AppBar
            className={classes.appBar}
            position="static"
            padding={3}
            color="inherit">
            <Toolbar className={classes.toolbar}>
                {authData ? (
                    <React.Fragment>
                        <Typography
                            onClick={() => history.push("/")}
                            variant="h6"
                            align="left"
                            className={classes.heading}>
                            Mercendes-Benz Vehicles Homepage
                        </Typography>
                        <Typography align="right" component={'span'}>
                            <Avatar
                                alt={username}
                                src={defaultProfile} />
                            <Typography >{username}</Typography>
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.logout}
                            color="secondary"
                            onClick={logout}>
                            Logout
                        </Button>
                    </React.Fragment>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => history.push("/login")}>
                        Login <InputIcon />
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar
