import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // used for api call but haven't done any

import rootReducer from './rootReducer';

// creating redux store
const vehiclesStore = createStore(
    rootReducer,
    // middleware for redux (extension on google chrome)
    // can also use logger by redux-logger with middleware
    composeWithDevTools(applyMiddleware(thunk))
)

export default vehiclesStore