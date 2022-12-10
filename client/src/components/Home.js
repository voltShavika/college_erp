import React, { useContext } from 'react'

import CollegeContext from '../Context/CollegeContext';

import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

export default function Home() {

    const context = useContext(CollegeContext);
    return (
        <>
            <Navbar/>
            <div className="container-fluid bg-light" style={{height: "100vh"}}>
                <div className="container">
                    <div className="row pt-5">
                    <div className="col-md-6">
                        <div className="card">
                        <Signup/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                        <Login/>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
