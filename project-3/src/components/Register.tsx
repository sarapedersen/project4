import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    let isEqual = false
    let isCorrectlength = false
    if (password.length <= 2 || password2.length <= 2 || username.length <= 2) {
      setMessage2("All fields must have minimun lenght of three characters")
      isCorrectlength = false
    } else {
      setMessage2("")
      isCorrectlength = true
    }
    console.log(username, password, password2)
    if (password === password2) {
      setMessage("")
      isEqual = true
      
      console.log(password, password2)
    } else {
      setMessage("Passwords are not equal")
      isEqual = false
      
    }
    console.log(isEqual, isCorrectlength)
    regUser(isEqual, isCorrectlength)
  };

  const regUser = (isEqual: Boolean, isCorrectlength: Boolean) => {
    if(isEqual === true && isCorrectlength === true){
        console.log(2345)
        //legg inn logikk 
    }
  }
  

  return (
    <div>
      <form>
        <h1>Log in</h1>
        <div className="form">
          <div className="field">
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <p> {message} </p>
          <p> {message2} </p>
          <button type="submit" onClick={submit}> Login</button>
        </div>
      </form>
    </div>
  );
}

export default Register;
