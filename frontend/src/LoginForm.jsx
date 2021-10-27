import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";

function LoginForm(props) {
console.log(props.textState)

  //state
  let {emailText, setEmailText, passwordText, setPasswordText} = props
  const setNewUser = props.setNewUser


  //handle text state
  function handleEmailTyping(event) {
    setEmailText(event.target.value);
  }
  function handlePasswordTyping(event) {
    setPasswordText(event.target.value);
  }

  function handleSubmit() {
    const userLoginInput = { email: emailText, password: passwordText };
    // console.log(userLoginInput);
    axios
      .post("http://localhost:3050/login", userLoginInput)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }

  function handleKeyPress(event) {
    if (event.charCode === 13) {
      event.preventDefault();
      handleSubmit();
    }
  }
  function submitButton(event) {
    event.preventDefault();
    handleSubmit();
  }
  function handleNewAccount(event) {
    event.preventDefault();
    setNewUser(true);
  }

  //to possibly impliment later
  function handleGoogleOAuth(event) {
    event.preventDefault();
    // //temporarily disabled
    // axios
    //   .get("http://localhost:3050/auth/google")
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
    //   .then(function () {});
  }

  return (
    <div>
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={emailText}
        onChange={handleEmailTyping}
        onKeyPress={handleKeyPress}
      />
      <Form.Text className="text-muted" id="italic"></Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Password"
        value={passwordText}
        onChange={handlePasswordTyping}
        onKeyPress={handleKeyPress}
      />
    </Form.Group>
    {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group> */}
    <Button variant="primary" type="submit" onClick={submitButton}>
      Submit
    </Button>
    <Button variant="secondary" type="submit" onClick={handleNewAccount}>
      New Account
    </Button>
  </Form>

  <div className="mb-2">
    <Button variant="primary" size="lg" onClick={handleGoogleOAuth}>
      Log in with Google
    </Button>{" "}
  </div>
</div>
  );
}

export default LoginForm;
