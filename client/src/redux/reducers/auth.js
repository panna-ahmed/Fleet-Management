import * as actionType from "../actions/actionTypes"

export const getLocalItems = () => {
    let list = localStorage.getItem("data");
    if (list) {
        return JSON.parse(list);
    }
    else {
        return null;
    }
}

const initState = {
    authData: getLocalItems("data") || null,
    loading: false,
    errors: null,
};
const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionType.AUTH:
            return {
                ...state,
                loading: true,
                authData: null,
                errors: null,
            };

        case actionType.AUTH_SUCCESS:
            //check error here 
            localStorage.setItem("data", JSON.stringify(action.data));
            // clear token automatically after two hours
            setTimeout(() => {
                localStorage.clear()
            }, action.data.expires)
            return {
                ...state,
                authData: action.data,
                loading: false,
                errors: null,
            };

        case actionType.AUTH_FAIL:
            return {
                ...state,
                authData: null,
                loading: false,
                errors: action.error,
            };

        case actionType.LOGOUT:
            localStorage.clear();
            return {
                ...state,
                authData: null,
                loading: false,
                errors: null,
            };

        default:
            return state;
    }
};

export default authReducer;