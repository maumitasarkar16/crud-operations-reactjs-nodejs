import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import { basicSchema, editSchema } from '../schemas';
import { useDispatch, useSelector } from "react-redux";
import { formDataUser, editDataUser } from '../utils/formSlice';
import '../App.css';

const Form = () => {

    const { formId } = useParams();
    const dispatch = useDispatch();
    const ref= useRef();
    const confPwd= useRef();

    const basicFormData = useSelector((store) => store.formData.registerStatus)
    const editFormData = useSelector((store) => store.formData.editStatus)

    //-------------------------------------------------------------//

    const [userData, setUserData] = useState({
        id: '',
        name: '',
        age: '',
        email: '',
        password: '',
        image: '',
        public_id: '',
        file: '',
        confirmPassword:''
    })

    useEffect(() => {
        if (formId) {
            getSingleFormData();
        } else {
            setUserData({
                id: '',
                name: '',
                age: '',
                email: '',
                password: '',
                image: '',
                public_id: '',
                file: '',
                confirmPassword: ''
            })

            ref.current.value = '';
            confPwd.current.value = ''
        }
    }, [formId,ref])

    const getSingleFormData = async () => {
        const data = await fetch('http://localhost:8001/api/basicForm/getFormDataList/' + formId);
        const json = await data.json();

        setUserData({
            ...userData,
            id: json._id,
            name: json.name,
            age: json.age,
            email: json.email,
            password: json.password,
            image: json.image,
            public_id: json.pubic_id,
            file: json.image
        
        })


    }
    //----------------------------------------------------------------//


    const onSubmit = async (values, actions) => {
        //console.log(values)
        if (formId) {
            dispatch(editDataUser(values))
        } else {
            dispatch(formDataUser(values))
            ref.current.value = '';
            confPwd.current.value = ''
            actions.resetForm();
        }
        
    }

    const formik = useFormik({
        initialValues: {
            id: userData.id ? userData.id : '',
            name: userData.name ? userData.name : '',
            age: userData.age ? userData.age : '',
            email: userData.email ? userData.email : '',
            password: userData.password ? userData.password : '',
            image: userData.image ? userData.image.substring(userData.image.lastIndexOf("/") + 1) : '',
            file: userData.image ? userData.image : ''
            
        },
        enableReinitialize: true,
        validationSchema: formId ? editSchema : basicSchema,
        onSubmit,
    });


    //----------------------------------------------//
    const handlePreview = (e) => {
        let reader = new FileReader();
        reader.onload = () => {
            setUserData({
                ...userData,
                file: reader.result,
            })
        }
        reader.readAsDataURL(e.target.files[0]);
        formik.setFieldValue("image", e.target.files[0]);

        
    }
    //----------------------------------------------//

   
    return (
        <div className='w-1/2 m-auto'>
            <h1 className='text-white font-semibold p-4 m-4 text-2xl items-center justify-center text-center'>{formId ? "Edit Form" : "Basic Form"}</h1>
            <form onSubmit={formik.handleSubmit} className='flex flex-col '>

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3" >
                        <label>Name: </label>
                        {formik.errors.name && formik.touched.name && <p className='text-red-700 font-normal text-sm'>{formik.errors.name}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0 ">
                        <input type="text" name="name" value={formik.values.name} placeholder='Enter Your Name' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.name && formik.touched.name ? "border-2 border-red-600 w-[100%] h-9 rounded p-2 m-2 " : " p-2 m-2 w-[100%] h-9 rounded"} />
                    </span>

                </div>

               
                
                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3">
                        <label>Upload Profile: </label>
                        {formik.errors.image && <p className='text-red-700 font-normal text-sm'>{formik.errors.image}</p>}
                    </span>
                    <span className="col-span-9 text-white items-center pl-4 lg:pl-2"> 
                        <input type="file"  name="image" ref={ref}  onChange={handlePreview} />
                        {!formId && formik.values.image ? <img src={userData.file} alt="" className='w-48 h-20'/> : formId && userData.file ? <img src={userData.file} alt="" className='w-48 h-20'/> : ''}
                        
                    </span>
                </div>


                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3" >
                        <label>Age: </label>
                        {formik.errors.age && formik.touched.age && <p className='text-red-700 font-normal text-sm'>{formik.errors.age}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="number"  name="age" value={formik.values.age} placeholder='Enter Your Age' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.age && formik.touched.age ? " border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2 " : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>

                </div>

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3" >
                        <label>Email: </label>
                        {formik.errors.email && formik.touched.email && <p className='text-red-700 font-normal text-sm'>{formik.errors.email}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="email"  name="email" value={formik.values.email} placeholder='Enter Your Email Id' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.email && formik.touched.email ? "border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>
                </div>

                {!formId &&
                    <div>
                        <div className='text-white  items-center justify-center grid grid-cols-12' >
                            <span className="col-span-3" >
                                <label>Password: </label>
                                {formik.errors.password && formik.touched.password && <p className='text-red-700 font-normal text-sm'>{formik.errors.password}</p>}
                            </span>
                            <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                                <input type="password"  name="password" value={formik.values.password} placeholder='Enter Your Password' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.password && formik.touched.password ? " border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                            </span>
                        </div>

                        <div className='text-white  items-center justify-center grid grid-cols-12'>
                            <span className="col-span-3">
                                <label>Confirm Password: </label>
                                {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className='text-red-700 font-normal text-sm'>{formik.errors.confirmPassword}</p>}
                            </span>
                            <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                                <input type="password" ref={confPwd}  name="confirmPassword" value={formik.values.confirmPassword} placeholder='Confirm Password' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                            </span>
                        </div>
                    </div>

                }

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <button className="p-2 m-2 bg-slate-600 rounded col-span-12 w-[100%]" disabled={formik.isSubmitting} type="submit">{formId && editFormData === "pending" ? <p>Submitting....</p> : !formId && basicFormData === "pending" ? <p>Submitting....</p> : <p>Submit</p>}</button>
                </div>
            </form>


        </div>

    )
}

export default Form