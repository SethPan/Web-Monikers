import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";

function NewUser(props) {

  //state
  const [emailAlert, setEmailAlert] = useState("")
  let {
    emailText,
    setEmailText,
    passwordText,
    setPasswordText,
  } = props;

  //handle text state
  function handleEmailTyping(event) {
    setEmailText(event.target.value);
    setEmailAlert("")
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
    axios({
      method: "POST",
      data: {
        email: emailText,
        password: passwordText,
      },
      withCredentials: true,
      url: "http://localhost:3050/register",
    }).then((response) => {
      console.log(response.data)
      if (response.data === "duplicate") {
        setEmailAlert("This email is already registered as an account")
      }
    });
  }

  return (
    <div>
      <div id="title">New User</div>
      <Form>
        <Form.Group
          className="mb-3"
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={emailText}
            onChange={handleEmailTyping}
            onKeyPress={handleKeyPress}
          />
          <Form.Text className="text-muted">
            We'll never share your email with
            anyone else.
          </Form.Text>
          <div id="emailAlert">{emailAlert}</div>
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={passwordText}
            onChange={handlePasswordTyping}
            onKeyPress={handleKeyPress}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={submitButton}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default NewUser;
