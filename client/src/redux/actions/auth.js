import axios from "axios";
import * as actionType from "./actionTypes";

export const signin = (formData, router) => async (dispatch) => {
    dispatch({ type: actionType.AUTH });
    const headers = {
        "Content-Type": "application/json",
    };
    await axios.post(`${process.env.REACT_APP_MY_API_HOST}/user/login`, formData, headers)
        .then(response => {
            dispatch({ type: actionType.AUTH_SUCCESS, data: response.data });
            router.push("/");
        }).catch(error => {
            dispatch({ type: actionType.AUTH_FAIL, error: error.response.data });
        })
};
