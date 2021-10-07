import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

function LoginForm(props) {
  // console.log(props);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");

  function handleEmailTyping(event) {
    setEmailText(event.target.value);
  }

  function handlePasswordTyping(event) {
    setPasswordText(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userLoginInput = { email: emailText, password: passwordText };
    axios
      .put("http://localhost:3050/userLogin", userLoginInput)
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

  function handleNewAccount(event) {
    event.preventDefault();
  }

  // function handleGoogleOAuth(event) {
  //   event.preventDefault();
  //   axios
  //     .get("http://localhost:3050/auth/google")
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  //     .then(function () {});
  // }

  async function handleGoogleOAuth(googleData) {
    const res = await fetch("http://localhost:3050/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // store returned user somehow
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
          <Form.Text className="text-muted" id="italic">
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
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="secondary" type="submit" onClick={handleNewAccount}>
          New Account
        </Button>
      </Form>
      <div>
        <GoogleLogin
          clientId={
            "146853270229-8oodlv1taugs81v7d9eshc5d14v4gqs9.apps.googleusercontent.com"
          }
          buttonText="Log in with Google"
          onSuccess={handleGoogleOAuth}
          onFailure={handleGoogleOAuth}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </div>
  );
}

export default LoginForm;
