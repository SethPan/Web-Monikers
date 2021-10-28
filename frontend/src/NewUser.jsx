import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";

function NewUser(props) {
  let {emailText, setEmailText, passwordText, setPasswordText} = props

  function handleEmailTyping(event) {
    setEmailText(event.target.value);
  }

  function handlePasswordTyping(event) {
    setPasswordText(event.target.value);
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

  function handleSubmit() {
    const userInput = { email: emailText, password: passwordText };
    // console.log(userInput);

    // put address to api handle new user submission below
    axios
      .post("", userInput)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  }

  return (
    <div>
      <div id="title">New User</div>
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
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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

        <Button variant="primary" type="submit" onClick={submitButton}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewUser;
