import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const initialCredentialValue = {
  username: "",
  password: ""
}

const initialFormErrors = {
  isError: false,
  message: 'Username or Password not valid.',
}

const Login = () => {
  const history = useHistory();
  const [credentials, setCredentials] = useState(initialCredentialValue);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/login", credentials)
    .then(res => {
      console.log(res);
      localStorage.setItem("authToken", res.data.payload);
      history.push("/protected");
    })
    .catch(err => {
      setFormErrors({
        ...initialFormErrors,
        isError: true
      })
      console.log(err)
    });
  };

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });

  const handleChange = e => {
    const userCredentials= {...credentials, [e.target.name]: e.target.value}
    setCredentials(userCredentials);
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={credentials.username} 
          onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password} 
        onChange={handleChange}
      />
      <button>Log in</button>
      <div>{formErrors.isError? formErrors.message : ""}</div>
    </form>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.