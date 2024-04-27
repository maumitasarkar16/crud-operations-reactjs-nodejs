import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


//action creator
export const formDataUser = createAsyncThunk(
    "formDataUser",
    async (values) => {
        try {
            const userData = await axios.post('http://localhost:8001/api/basicForm', {
                name: values.name,
                age: values.age,
                email: values.email,
                password: values.password,
            });

            return userData.data;

        } catch (error) {
            //console.log(error.response.data);
            return error.response.data;

        }
    }
);


//action creator
export const editDataUser = createAsyncThunk(
    "editDataUser",
    async (values) => {
        try {
            const userData = await axios.patch('http://localhost:8001/api/basicForm/updateFormData/' + values.id , {
                name: values.name,
                age: values.age,
                email: values.email,
                password: values.password
            });

            return userData.data;

        } catch (error) {
            return error.response.data;

        }
    }
);

const formSlice = createSlice({
    name: "formData",
    initialState: {
        registerStatus: '',
        editStatus: ''
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(formDataUser.pending, (state) => {
            return { ...state, registerStatus: "pending" }
        })

        builder.addCase(formDataUser.fulfilled, (state, action) => {
            //console.log("action---", action.payload)
            if (action.payload) {
                return {
                    ...state,
                    registerStatus: "success"
                }
            } else return state;

        })

        builder.addCase(formDataUser.rejected, (state) => {
            return {
                ...state,
                registerStatus: "rejected",
            }
        })
        

        //-----------------------------------//


        builder.addCase(editDataUser.pending, (state) => {
            return { ...state, editStatus: "pending" }
        })

        builder.addCase(editDataUser.fulfilled, (state, action) => {
            console.log("action---", action.payload)
            if (action.payload) {
                return {
                    ...state,
                    editStatus: "success"
                }
            } else return state;

        })

        builder.addCase(editDataUser.rejected, (state) => {
            return {
                ...state,
                editStatus: "rejected",
            }
        })



    },
})


export default formSlice.reducer