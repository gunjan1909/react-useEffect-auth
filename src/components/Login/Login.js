import React, { useState, useEffect } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  //get entered email and password then validate it in useEffect
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  //for applying the css for invalid inputs
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log("useEffect");
  });
  //this will run when either enteredEmail or enteredPassword changes as they are the dependencies in the array, and check for forIsValid after 750ms of pause not after every keystroke
  useEffect(() => {
    const indetifier = setTimeout(() => {
      //console.log("checking form validity");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 750);

    //cleanup function: runs before every new side effect function, not before very first side effect function
    //clear the timer whenever every sideeffct function runs and every new sideeffect function runs timers restarts from 0
    return () => {
      // console.log("cleanup");
      clearTimeout(indetifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    //set value of enteredEmail
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    //set value of enteredPassword
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    //enteredEmail.includes("@") this will be true if the email is valid else it will be false
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    //enteredPassword.trim().length > 6 this will be true if the password is valid else it will be false
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
