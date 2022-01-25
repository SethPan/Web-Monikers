import React from "react";
import LoginForm from "./LoginForm";
import NewUser from "./NewUser.jsx";
import NewUserAdded from "./NewUserAdded.jsx"
import { useState } from "react";

function Routes(props) {
  //state
  const [page, setNewPage] = useState("login");
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  let currentComp = <div></div>;

  if (page === "newUser") {
    currentComp = (
      <div>
        <NewUser
          setNewPage={setNewPage}
          emailText={emailText}
          setEmailText={setEmailText}
          passwordText={passwordText}
          setPasswordText={setPasswordText}
        />
      </div>
    );
  }
  if (page === "login") {
    currentComp = (
      <div>
        <LoginForm
          setNewPage={setNewPage}
          emailText={emailText}
          setEmailText={setEmailText}
          passwordText={passwordText}
          setPasswordText={setPasswordText}
        />
        ;
      </div>
    );
  }
  if (page === "newUserAdded") {
    currentComp = (
    <div>
      <NewUserAdded 
        setNewPage={setNewPage}
        emailText={emailText}
        setEmailText={setEmailText}
        passwordText={passwordText}
        setPasswordText={setPasswordText}
      />
      ;
    </div>
  );}

  return currentComp;
}

export default Routes;
