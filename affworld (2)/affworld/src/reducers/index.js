import authReducer from './auth.reducer'
const { combineReducers } = require("redux");

const rootReducers = combineReducers({
    auth: authReducer,
})

export default rootReducers