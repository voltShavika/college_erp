import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import CollegeContext from '../Context/CollegeContext'

export default function Navbar() {
  const {loginStatus, logout} = useContext(CollegeContext);

  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">College ERP</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
                {
                  loginStatus && 
                  <li className="nav-item">
                    <button className='btn btn-warning' onClick={()=> logout(navigate)}>Logout</button>
                  </li>
                }
                
            </ul>
            </div>
        </div>
    </nav>
  )
}
