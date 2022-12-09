import React, { useState } from 'react'
import axios from 'axios'

export default function FileUploadComponent() {

  const [profileImage, setProfileImage] = useState("");


  const handleChange = (e) => {
    console.log(e.target);
    setProfileImage(e.target.files[0])
  }

  const handleSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImg', profileImage);
    formData.append('name', "Laptop");
    formData.append('email', "Laptp@gmail.com");
    formData.append('password', "Test@123");
    formData.append('number', "98989898");
    axios.post("http://localhost:8000/api/signup", formData, {}).then(res => {
      console.log(res)
    }).catch(e => {
      console.log(e);
    })
  }

  return (
    <div>
        <h4>Select a file to upload</h4>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleChange}></input>
            <button type='submit'>Click to Upload</button>
        </form>
    </div>

  )
}
