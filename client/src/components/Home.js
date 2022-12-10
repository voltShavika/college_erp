import React, { useContext } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import CollegeContext from '../Context/CollegeContext';

import Login from "./Login";
import Navbar from "./Navbar";
import Signup from "./Signup";

export default function Home() {

    const context = useContext(CollegeContext);
    return (
        <>
            <Navbar/>
            
            <div className='container-fluid bg-light' style={{height: "100vh"}}>
                <div className='row'>
                    <div className='col-md-3'>
                    </div>
                    <div className='col-md-6'>
                        <div className='card mt-5'>
                            <Tabs
                                defaultActiveKey="login"
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                >
                                <Tab eventKey="login" title="Login">
                                    <Login/>
                                </Tab>
                                <Tab eventKey="Signup" title="Signup">
                                    <Signup/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}
