import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { deleteDataUser } from '../utils/formSlice';

const List = () => {

    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    
    const deleteResponse = useSelector((store) => store.formData.deleteStatus);
    console.log("deleteResponse----", deleteResponse)

    useEffect(() => {
        getFormData()
    }, [deleteResponse])

    const getFormData = async () => { 
        const data = await fetch('http://localhost:8001/api/basicForm/getAllFormData');
        const json = await data.json();
        setData(json)
    }

  

    const handleDelete = async (id) => {
       dispatch(deleteDataUser(id))
       if( deleteResponse === "success" ) {
        getFormData()
        
       }
        
    }

    
    return (
        <div className=' text-white mx-auto my-24'>
            <table className=''>
                <tr className='border-2 border-white'>
                    <th className='border-2 border-white px-24 py-3'>Name</th>
                    <th className='border-2 border-white px-24 py-3'>Age</th>
                    <th className='border-2 border-white px-24 py-3'>Email Id</th>
                    <th className='border-2 border-white px-24 py-3'>Profile</th>
                    <th className='border-2 border-white px-24 py-3'>Action</th>
                </tr>
                {
                    data && data.map(item =>
                        <tr className='border-2 border-white' key={item._id}>
                            <td className='border-2 border-white px-24 py-2'>{item.name}</td>
                            <td className='border-2 border-white px-24 py-2'>{item.age}</td>
                            <td className='border-2 border-white px-24 py-2'>{item.email}</td>
                            <td className='border-2 border-white px-24 py-2'><img src={item.image} alt="" className='w-40 h-40'  /></td>
                            <td className='border-2 border-white px-24 py-2'><Link to={"/editFormData/" + item._id}>Edit</Link> | <button onClick={() => handleDelete(item._id)}>Delete</button></td>
                        </tr>

                )}



            </table>

            { deleteResponse === "success" ?  <h2>Deleted Successfully..</h2> : '' }
        </div>
    )
}

export default List