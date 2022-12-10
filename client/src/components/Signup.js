import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import CollegeContext from '../Context/CollegeContext';

const validateFormFields = (iName, iEmail, iNumber, iPass) => {
  const errors = [];
  if(iName.length < 1){
    errors.push("Name cannot be empty");
  }
  if(iEmail.indexOf("@") == -1){
    errors.push("Email should be valid");
  }
  if(iNumber.length != 10){
    errors.push("Number should be 10 Digit");
  }
  if(iPass.length < 8){
    errors.push("Password should be minimum 8 characters");
  }
  return errors;
}

export default function Signup() {

  const context = useContext(CollegeContext);

  const [errors, setErrors] = useState([]);
  const [resumeFile, setResumeFile] = useState("");
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const numberRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setResumeFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const iName = nameRef.current.value;
    const iEmail = emailRef.current.value;
    const iNumber = numberRef.current.value;
    const iPass = passRef.current.value;
    const formErrors = validateFormFields(iName, iEmail, iNumber, iPass)
    if(formErrors.length <= 0){
      setLoading(true);
      const formData = new FormData();
      formData.append('resumeFile', resumeFile);
      formData.append('name', iName);
      formData.append('email', iEmail);
      formData.append('password', iPass);
      formData.append('number', iNumber);
      axios.post("http://localhost:8000/api/signup", formData, {}).then(res => {
        if(res.data.code == 1){
          setErrors([]);
          context.login(res.data.data, navigate);
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

  return (
    <div>
      <div className='text-center'>
        <h3 className='mt-3'>Signup to College</h3>
      </div>
      <div className='p-5'>
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
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <br/><br/>
          </div>
          
        }
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input ref={nameRef} type="text" className="form-control" placeholder='Enter your name'  />
          </div>
          <div className="mb-3">
            <input ref={numberRef}  type="text" className="form-control" placeholder='Enter your number' />
          </div>
          <div className="mb-3">
            <input ref={emailRef}  type="email" className="form-control" placeholder='Enter your email id'  />
          </div>
          
          <div className="mb-3">
            <input ref={passRef}  type="password" className="form-control" placeholder='Enter your password' />
          </div>
          <div className="mb-3">
            <label>Upload Resume(Optional)</label>
            <br/><br/>
            <input type="file" onChange={handleChange} placeholder="Select Your Resume" accept="application/pdf"/>
          </div>
          <div className='text-center'>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>

  )
}
