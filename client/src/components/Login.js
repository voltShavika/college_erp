import React, { useRef, useState } from 'react'
import axios from 'axios'

const validateFormFields = (iEmail, iPass) => {
    const errors = [];
    
    if(iEmail.indexOf("@") == -1){
      errors.push("Email should be valid");
    }
    if(iPass.length < 1){
      errors.push("Password cannot be blank");
    }
    return errors;
  }

export default function Login() {
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const emailRef = useRef();
    const passRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const iEmail = emailRef.current.value;
        const iPass = passRef.current.value;
        const formErrors = validateFormFields(iEmail, iPass)
        if(formErrors.length <= 0){
            setLoading(false);
            axios.post("http://localhost:8000/api/login", {
                email: iEmail,
                password: iPass
            }).then((res) => {
                if(res.data.code == 1){
                    alert("YAYYYAYA");
                    setErrors([]);
                }
                else{
                    formErrors.push(res.data.msg);
                    setErrors([...formErrors])
                }
                setLoading(false);
            }).catch((e) => {
                formErrors.push("Something went wrong. Try again later");
                setErrors([...formErrors])
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
            <h3 className='mt-3'>Login to College</h3>
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
                    <input ref={emailRef}  type="email" className="form-control" placeholder='Enter your email id'  />
                </div>
                
                <div className="mb-3">
                    <input ref={passRef}  type="password" className="form-control" placeholder='Enter your password' />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
    )
}
