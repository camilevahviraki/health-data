import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from 'react-icons/cg';
import './App.css';


function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  // User Login info
  const database = [
    {
      username: "user",
      password: "123456"
    },
    {
      username: "parent",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "key", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
      setIsSubmitted(false);
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
      <div className="icon">
        <CgProfile />
      </div>
      <h1>Connect</h1>
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
          <label>Key</label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  
  let navigate = useNavigate();
  const condition = () => {
    if(isSubmitted === true) {
      navigate("./doctor", { replace: true });
    }
    else{
      console.log(isSubmitted)
      return renderForm
    }
  }

  return (
    <div className="app">
      <div className="login-form">
        {condition()}
      </div>
    </div>
  );
}

export default Login;