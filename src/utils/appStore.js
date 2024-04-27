import { configureStore } from "@reduxjs/toolkit";
import formDataUserReducer  from "./formSlice";

const appStore = configureStore({
    reducer: {
        formData: formDataUserReducer
    },
})

export default appStore;