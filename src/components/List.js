import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const List = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getFormData()
    }, [])

    const getFormData = async () => {
        const data = await fetch('http://localhost:8001/api/basicForm/getAllFormData');
        const json = await data.json();
        console.log("json====", json)
        setData(json)
    }
    console.log("data====", data)
    return (
        <div className=' text-white mx-auto my-24'>
            <table className=''>
                <tr className='border-2 border-white'>
                    <th className='border-2 border-white px-24 py-3'>Name</th>
                    <th className='border-2 border-white px-24 py-3'>Age</th>
                    <th className='border-2 border-white px-24 py-3'>Email Id</th>
                    <th className='border-2 border-white px-24 py-3'>Action</th>
                </tr>
                {
                    data && data.map(item =>
                        <tr className='border-2 border-white' key={item._id}>
                            <td className='border-2 border-white px-24 py-2'>{item.name}</td>
                            <td className='border-2 border-white px-24 py-2'>{item.age}</td>
                            <td className='border-2 border-white px-24 py-2'>{item.email}</td>
                            <td className='border-2 border-white px-24 py-2'><Link to={"/editFormData/" + item._id}>Edit</Link> | <button>Delete</button></td>
                        </tr>

                )}



            </table>
        </div>
    )
}

export default List