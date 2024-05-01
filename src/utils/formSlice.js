import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


//action creator
export const formDataUser = createAsyncThunk(
    "formDataUser",
    async (values) => {
        const imageData = new FormData();
        //const dateTime = new Date()

        try {

            imageData.append("file", values.image)
            imageData.append("upload_preset", "tfpcaaaw")

            return await axios.post('https://api.cloudinary.com/v1_1/ddnab9ywj/image/upload', imageData)
                .then(async (imageRes) => {
                    console.log(imageRes);
                    await axios.post('http://localhost:8001/api/basicForm', {
                        name: values.name,
                        age: values.age,
                        email: values.email,
                        password: values.password,
                        image: imageRes.data.secure_url,
                        public_id: imageRes.data.public_id
                    }).then((userRes) => {
                        console.log(userRes);
                        return userRes
                    })

                    return imageRes

                });


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
        const imageData = new FormData();

        try {

            imageData.append("file", values.image)
            imageData.append("upload_preset", "tfpcaaaw")

            return await axios.post('https://api.cloudinary.com/v1_1/ddnab9ywj/image/upload', imageData)
                .then(async (imageRes) => {
                    console.log(imageRes);
                    await axios.patch('http://localhost:8001/api/basicForm/updateFormData/' + values.id, {
                        name: values.name,
                        age: values.age,
                        email: values.email,
                        password: values.password,
                        image: imageRes.data.secure_url,
                        public_id: imageRes.data.public_id
                    }).then((userRes) => {
                        console.log(userRes);
                        return userRes
                    })

                    return imageRes

                });


        } catch (error) {
            return error.response.data;

        }
    }
);


//action creator
export const deleteDataUser = createAsyncThunk(
    "deleteDataUser",
    async (id) => {
        try {

            return await axios.delete('http://localhost:8001/api/basicForm/deleteFormData/' + id).then(res => {
                if (res.status === 204) {
                    return true;
                }

            })


        } catch (error) {
            return error.response.data;

        }
    }
);


const formSlice = createSlice({
    name: "formData",
    initialState: {
        registerStatus: '',
        editStatus: '',
        deleteStatus: ''
    },
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(formDataUser.pending, (state) => {
            return { ...state, registerStatus: "pending" }
        })

        builder.addCase(formDataUser.fulfilled, (state, action) => {
            console.log("action---", action.payload)
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


        //-----------------------------------//


        builder.addCase(deleteDataUser.pending, (state) => {
            return { ...state, deleteStatus: "pending" }
        })

        builder.addCase(deleteDataUser.fulfilled, (state, action) => {
            console.log("delete action---", action.payload)
            if (action.payload) {
                return {
                    ...state,
                    deleteStatus: "success"
                }
            } else return state;

        })

        builder.addCase(deleteDataUser.rejected, (state) => {
            return {
                ...state,
                deleteStatus: "rejected",
            }
        })



    },
})


export default formSlice.reducer