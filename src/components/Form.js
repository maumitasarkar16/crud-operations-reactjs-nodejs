import React from 'react';
import { useFormik } from 'formik';
import { basicSchema } from '../schemas';
import { useDispatch, useSelector } from "react-redux";
import { formDataUser } from '../utils/formSlice';
import '../App.css';

const Form = () => {
    const dispatch = useDispatch();
    const basicFormData = useSelector( (store) => store.formData.registerStatus)
    console.log("basicFormData=========", basicFormData)
    
    const onSubmit = async (values, actions) => {
        dispatch(formDataUser(values))
        actions.resetForm();
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: basicSchema,
        onSubmit,
    });


    return (


        <div className='w-1/2 m-auto'>
            <h1 className='text-white font-semibold p-4 m-4 text-2xl items-center justify-center text-center'>Basic Form</h1>
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
                    <span className="col-span-3" >
                        <label>Age: </label>
                        {formik.errors.age && formik.touched.age && <p className='text-red-700 font-normal text-sm'>{formik.errors.age}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="number" name="age" value={formik.values.age} placeholder='Enter Your Age' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.age && formik.touched.age ? " border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2 " : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>

                </div>

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3" >
                        <label>Email: </label>
                        {formik.errors.email && formik.touched.email && <p className='text-red-700 font-normal text-sm'>{formik.errors.email}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="email" name="email" value={formik.values.email} placeholder='Enter Your Email Id' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.email && formik.touched.email ? "border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>
                </div>


                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3" >
                        <label>Password: </label>
                        {formik.errors.password && formik.touched.password && <p className='text-red-700 font-normal text-sm'>{formik.errors.password}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="password" name="password" value={formik.values.password} placeholder='Enter Your Password' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.password && formik.touched.password ? " border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>
                </div>

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <span className="col-span-3">
                        <label>Confirm Password: </label>
                        {formik.errors.confirmPassword && formik.touched.confirmPassword && <p className='text-red-700 font-normal text-sm'>{formik.errors.confirmPassword}</p>}
                    </span>
                    <span className="col-span-9 text-black items-center pl-4 lg:pl-0">
                        <input type="password" name="confirmPassword" value={formik.values.confirmPassword} placeholder='Confirm Password' onChange={formik.handleChange} onBlur={formik.handleBlur} className={formik.errors.confirmPassword && formik.touched.confirmPassword ? "border-2 border-red-600 rounded h-9 w-[100%] p-2 m-2" : "rounded h-9 w-[100%] p-2 m-2"} />
                    </span>
                </div>

                <div className='text-white  items-center justify-center grid grid-cols-12'>
                    <button className="p-2 m-2 bg-slate-600 rounded col-span-12 w-[100%]" disabled={formik.isSubmitting} type="submit">{basicFormData === "pending" ? <p>Submitting....</p> : <p>Submit</p>}</button>
                </div>
                
            </form>
            

        </div>

    )
}

export default Form