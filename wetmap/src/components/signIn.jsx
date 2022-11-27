// import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { SessionContext } from "./contexts/sessionContext";
import {
  sessionCheck,
  signInStandard,
  signInFaceBook,
  signInGoogle,
} from "../supabaseCalls/authenticateSupabaseCalls";
import "./authenication.css";
let emailVar = false;
let passwordVar = false;

export default function SignInRoute() {
  const { activeSession, setActiveSession } = useContext(SessionContext);

  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });

  const [formValidation, SetFormValidation] = useState({
    emailVal: false,
    passwordVal: false,
  });

  const handleSignInSubmit = async () => {
    if (formVals.email === "" || formVals.email === null) {
      emailVar = true;
    } else {
      emailVar = false;
    }

    if (formVals.password === "" || formVals.password === null) {
      passwordVar = true;
    } else {
      passwordVar = false;
    }

    SetFormValidation({
      ...formValidation,
      emailVal: emailVar,
      passwordVal: passwordVar,
    });

    if (formVals.email === "" || formVals.password == "") {
      return;
    } else {
      let accessToken = await signInStandard(formVals);
      if (accessToken) {
        await localStorage.setItem("token", JSON.stringify(accessToken));
        setActiveSession(accessToken);
      }
      let checker = await sessionCheck();
      //  console.log("checkerbox", checker)
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
  }

  return (
    <div className="containerDiv">
      <Form onSubmit={handleSignInSubmit} className="formstyle">
      <Input
              // id="standard-basic"
              // label="Latitude"
              placeholder="Email"
              // variant="standard"
              className="inpts"
              type="text"
              name="email"
              value={formVals.email}
              onChange={handleChange}
            />
     
     <Input
              // id="standard-basic"
              // label="Latitude"
              placeholder="Password"
              // variant="standard"
              className="inpts"
              type="password"
              name="password"
              value={formVals.password}
              onChange={handleChange}
            />
          <div className="signButton" onClick={handleSignInSubmit}>
            Sign In
          </div>
      </Form>
    </div>
  );
}
