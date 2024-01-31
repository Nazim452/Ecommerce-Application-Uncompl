import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer bg-dark text-light p-3'>
      <h4 className='text-center'>All Right Reserved &copy; Nazim</h4>
      <div className="text-center">
        {/* <Link to="/about">About</Link>|
        <Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link> */}
        <a href="/about">About</a>|
        <a href="/contact">Contact</a>|
        <a href="/policy">Privacy Policy</a>
        <Link to="/"></Link>
      </div>
    </div>
  )
}

export default Footer