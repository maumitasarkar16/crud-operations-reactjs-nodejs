import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='text-white py-2 my-2'>
        <Link to="/" className='p-2 m-2'>Basic Form</Link>
        <Link to="/list" className='p-2 m-2'>Form Data</Link>
    </div>
  )
}

export default Header