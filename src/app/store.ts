import { configureStore } from "@reduxjs/toolkit";
import divisionReducer from "./division";

const store = configureStore({
    reducer: {
        division: divisionReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;