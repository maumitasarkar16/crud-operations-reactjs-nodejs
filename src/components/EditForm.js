import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useFormik } from 'formik';
import { basicSchema } from '../schemas';
import { useDispatch } from 'react-redux';
import { editDataUser } from '../utils/formSlice';

const EditForm = () => {

    const { formId } = useParams();
    const dispatch = useDispatch()

    //-------------------------------------------------------------//
   
    const [userData, setUserData] = useState({
        id:'',
        name: '',
        age:'',
        email:'',
        password:''
    })

    useEffect(() => {
        getSingleFormData()
    }, [])

    const getSingleFormData = async () => {
        const data = await fetch('http://localhost:8001/api/basicForm/getFormDataList/' + formId);
        const json = await data.json();
       
        setUserData({ 
            ...userData,
            id: json._id,
            name: json.name,
            age: json.age,
            email:  json.email, 
            password:  json.password })
        
    }
   //----------------------------------------------------------------//
   // console.log('data---',data)

   
//console.log("userData===", userData)

const onSubmit = async (values, actions) => {
    console.log("values========",values)
    dispatch(editDataUser(values))
    actions.resetForm();
}

const formik = useFormik({
    initialValues: {
        id: userData.id ? userData.id : '',
        name: userData.name ? userData.name : '',
        age: userData.age ? userData.age : '',
        email: userData.email ?  userData.email : '',
        password: userData.password ?  userData.password : '',
    },
    enableReinitialize: true,
    //validationSchema: basicSchema,
    onSubmit
    
});
    
//console.log("formik.values---", formik.values)



// const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("userData---", userData)
//     dispatch(editDataUser(userData))
    
// }

  return (
    <div className='w-1/2 m-auto'>
        <h1 className='text-white font-semibold p-4 m-4 text-2xl items-center justify-center text-center'>Edit Form</h1>
        {/* <form   className='flex flex-col'> */}
        <form onSubmit={formik.handleSubmit}  className='flex flex-col'>

            <div className='text-white  items-center justify-center grid grid-cols-12'>
                <span className="col-span-3">
                    <label>Name: </label>
                </span>
                <span className="col-span-9 text-black items-center pl-4 lg:pl-0 ">
                    {/* <input className="p-2 m-2 w-[100%] h-9 rounded" type="text" name="name" value={userData.name} onChange={ (e) => setUserData({...userData, name: e.target.value})}  /> */}
                    <input className="p-2 m-2 w-[100%] h-9 rounded" type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                </span>
            </div>
            
            <div className='text-white  items-center justify-center grid grid-cols-12'>
                <span className="col-span-3">
                    <label>Age: </label>
                </span>
                <span className="col-span-9 text-black items-center pl-4 lg:pl-0 ">
                    {/* <input className="p-2 m-2 w-[100%] h-9 rounded" type="number" name="age" value={userData.age} onChange={ (e) => setUserData({...userData, age: e.target.value})} /> */}

                    <input className="p-2 m-2 w-[100%] h-9 rounded" type="number" name="age" value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                </span>
            </div>

            <div className='text-white  items-center justify-center grid grid-cols-12'>
                <span className="col-span-3">
                    <label>Email Id: </label>
                </span>
                <span className="col-span-9 text-black items-center pl-4 lg:pl-0 ">
                    {/* <input className="p-2 m-2 w-[100%] h-9 rounded" type="text" name="email" value={userData.email} onChange={ (e) => setUserData({...userData, email: e.target.value})} /> */}

                    <input className="p-2 m-2 w-[100%] h-9 rounded" type="text" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                </span>
            </div>

            <div className='text-white  items-center justify-center grid grid-cols-12'>
                {/* <button className="p-2 m-2 bg-slate-600 rounded col-span-12 w-[100%]" type='submit' onClick={handleSubmit}>Submit</button> */}
                <button className="p-2 m-2 bg-slate-600 rounded col-span-12 w-[100%]" type='submit'>Submit</button>
            </div>
            
        </form>
    </div>
  )
}

export default EditForm