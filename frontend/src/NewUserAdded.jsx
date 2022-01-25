import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import { useState } from "react";
import axios from "axios";

function NewUserAdded(props) {
  let { emailText, setEmailText, passwordText, setPasswordText } = props;
  const setNewPage = props.setNewPage;

  function continueButton(event) {
    event.preventDefault();
    setNewPage("login");
  }

  return (
    <div>
      {" "}
      <div id="title">New User Added</div>
      <Button variant="primary" type="submit" onClick={continueButton}>
        Continue to login screen
      </Button>
    </div>
  );
}

export default NewUserAdded;
