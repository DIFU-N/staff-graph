import { configureStore } from "@reduxjs/toolkit";
import departmentReducer from "./department";

const store = configureStore({
    reducer: {
        department: departmentReducer
    }
})

export default store;