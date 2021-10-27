import React from "react";
import LoginForm from "./LoginForm";
import NewUser from "./NewUser.jsx";
import { useState } from "react";

function Routes(props) {
  //state
  const [newUser, setNewUser] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [currentComp, setCurrentComp] = useState(
    <div>
      <LoginForm setNewUser={setNewUser} emailText={emailText} setEmailText={setEmailText} passwordText={passwordText} setPasswordText={setPasswordText} />;
    </div>
  );

  //was new user button pressed
  if (newUser) {
    setCurrentComp(<div><NewUser emailText={emailText} setEmailText={setEmailText} passwordText={passwordText} setPasswordText={setPasswordText} /></div>);
  }

  return (
    currentComp
  );
}

export default Routes;
