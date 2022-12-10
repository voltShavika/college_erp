import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import CollegeContext from '../Context/CollegeContext'

import { GET_STUDENTS_API } from '../api';

export default function StaffProfile() {

    const {students, setStudents} = useContext(CollegeContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get(GET_STUDENTS_API).then(res => {
            if(res.data.code == 1){
                setStudents([...res.data.data]);
            }
            setLoading(false);
        }).catch(err => {
            setLoading(false);
        })
    },[])

    const handleResumeClick = (i) => {
        console.log(students[i]);
        setSelectedUser({...students[i]});
    }

    return (
        <div className="container-fluid bg-light" style={{height: "100vh"}}>
            <div className='row p-5'>
                <div className='col-md-7 col-sm-12'>
                    <div className='ps-1'>
                        <h4 className='mt-3'>Students Upload History</h4>
                    </div>
                    <hr/>
                    {
                        loading
                        ?
                            <div className='text-center'>
                                <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                                </div>
                                <br/><br/>
                            </div>
                        :
                        <div className='card pb-2'>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Number</th>
                                    <th scope="col">Resume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((student, i) => {
                                            let date = new Date(student.resume.uploadedAt);
                                            return (
                                                <tr key={i}>
                                                    <th scope="row">{i+1}</th>
                                                    <td>{student.name}</td>
                                                    <td>{student.email}</td>
                                                    <td>{student.number}</td>
                                                    <td>
                                                        <button className='btn btn-primary' onClick={()=> handleResumeClick(i)}>
                                                            {date.toLocaleString()}
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className='col-md-5 col-sm-12'>
                    <div className='ps-1'>
                        <h4 className='mt-3'>Resume Preview</h4>
                    </div>
                    <hr/>
                    {
                        selectedUser?
                        <iframe src={selectedUser.resume.url}  width="100%" height="550px"></iframe>
                        :<p>Please Select a user </p>
                    }

                </div>
            </div>
        </div>
    )
}
