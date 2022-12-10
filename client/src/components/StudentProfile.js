import React, { useContext, useState, useRef } from 'react'
import axios from 'axios'
import CollegeContext from '../Context/CollegeContext'

const validateFormFields = (iName, iNumber) => {
  const errors = [];
  if(iName.length < 1){
    errors.push("Name cannot be empty");
  }
  if(iNumber.length != 10){
    errors.push("Number should be 10 Digit");
  }
  return errors;
}

const validatePassfields = (pass1, pass2) => {
  const errors = [];
  if(pass1.length < 8){
    errors.push("Password should be alteast 8 character")
  }
  if(pass1 !== pass2){
    errors.push("New Password does'nt match");
  }
  return errors;
}

export default function StudentProfile() {
  const {user, setUser} = useContext(CollegeContext);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const [passErrors, setPassErrors] = useState([]);
  const [passLoading, setPassLoading] = useState(false);

  const [resumeFile, setResumeFile] = useState("");
  const nameRef = useRef();
  const numberRef = useRef();

  const pass1Ref = useRef();
  const pass2Ref = useRef();

  const handleChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const iName = nameRef.current.value;
    const iNumber = numberRef.current.value;
    const formErrors = validateFormFields(iName, iNumber)
    if(formErrors.length <= 0){
      setLoading(true);
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);
      formData.append('name', iName);
      formData.append('number', iNumber);
      axios.post(`http://localhost:8000/api/user/${user._id}`, formData, {}).then(res => {
        if(res.data.code == 1){
          setUser(res.data.data);
          console.log(res.data.data);
        }
        else{
          formErrors.push(res.data.msg);
          setErrors([...formErrors]);
        }
        setLoading(false);
      }).catch(e => {
        formErrors.push("Something went wrong. Try again later");
          setErrors([...formErrors]);
          setLoading(false);
      })
    }
    else{
      setErrors([...formErrors])
    }
  }

  const handlePassSubmit = (e) => {
    console.log("Coming in here");
    e.preventDefault();
    const newPass = pass1Ref.current.value;
    const reNewPass = pass2Ref.current.value;
    const formErrors = validatePassfields(newPass, reNewPass);
    console.log(formErrors);
    if(formErrors.length < 1){
      console.log("In here");
      setPassLoading(true);
      axios.post(`http://localhost:8000/api/change_password/${user._id}`, {
        password: newPass
      }).then(res => {
        if(res.data.code == 1){
          setUser({...res.data.data});
          setPassErrors([]);
          pass1Ref.current.value = "";
          pass2Ref.current.value = "";
        }
        else{
          formErrors.push(res.data.msg);
          setPassErrors([...formErrors])
        }
        setPassLoading(false);
      }).catch(err => {
          formErrors.push("Something went wrong. try again later");
          setPassErrors([...formErrors])
          setPassLoading(false);
      })
    }
    else{
      setPassErrors([...formErrors]);
    }
  }

  
  return (
    <div className="container-fluid bg-light" style={{height: "100vh"}}>
      <div className='row p-5'>
        <div className='col-md-6'>
          <div className='card'>
            <div>
              <div className='ps-5'>
                <h4 className='mt-3'>Update Details</h4>
              </div>
              <hr/>
              <div className='ps-5 pe-5'>
                {
                  errors.length > 0 && 
                  <div className='alert alert-danger'>
                    <ul>
                      {
                        errors.map((error, i) => <li key={i}>{error}</li>)
                      }
                    </ul>
                  </div>
                }

                {
                  loading && 
                  <div className='text-center'>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <br/><br/>
                  </div>
                  
                }
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input ref={nameRef} defaultValue={user.name} type="text" className="form-control" placeholder='Enter your name'  />
                  </div>
                  <div className="mb-3">
                    <input ref={numberRef} defaultValue={user.number}  type="text" className="form-control" placeholder='Enter your number' />
                  </div>
                  <div className="mb-3">
                    <input value={user.email} type="email" className="form-control" placeholder='Enter your email id' disabled />
                  </div>
                  <div className="mb-3">
                    <label>Upload Resume(Optional)</label>
                    <br/><br/>
                    <input type="file" onChange={handleChange} placeholder="Select Your Resume" accept="application/pdf"/>
                  </div>
                  <div className='text-center'>
                    <button type="submit" className="btn btn-primary">Update Profile</button>
                  </div>
                </form>
              </div>
              <br/>
              <hr/>
              <div className='ps-5'>
                <h4 className='mt-3'>Change Password</h4>
              </div>
              <hr/>
              <div className='ps-5 pe-5'>
                {
                  passErrors.length > 0 && 
                  <div className='alert alert-danger'>
                    <ul>
                      {
                        passErrors.map((error, i) => <li key={i}>{error}</li>)
                      }
                    </ul>
                  </div>
                }

                {
                  passLoading && 
                  <div className='text-center'>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <br/><br/>
                  </div>
                  
                }
                
                <form onSubmit={handlePassSubmit}>
                  <div className="mb-3">
                    <input ref={pass1Ref} type="password" className="form-control"/>
                  </div>
                  <div className="mb-3">
                    <input ref={pass2Ref} type="password" className="form-control"/>
                  </div>
                  <div className='text-center'>
                    <button type="submit" className="btn btn-success">Change Password</button>
                  </div>
                </form>
                <br/>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='card text-center' style={{height: "100%"}}>
            {
              (user.hasOwnProperty('resume') && user.resume.url.length > 0)? 
              <object data={user.resume.url} type="application/pdf" width="100%" height="100%">
                  <p>Alternative text - include a link <a href={user.resume.url}>to the PDF!</a></p>
              </object>
              :<h3 className='mt-5'>No Resume uploaded</h3>
            }
          </div>
        </div>
      </div>

    </div>
  )
}
