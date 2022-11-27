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

  const [loginFail, setLoginFail] = useState(null)

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
      setLoginFail("Please fill out both email and password")
      return;
    } else {
      let accessToken = await signInStandard(formVals);
      if (accessToken) {
        await localStorage.setItem("token", JSON.stringify(accessToken));
        setActiveSession(accessToken);
      } else {
        setLoginFail("The credentials you supplied are not valid")
        return;
      }
      let checker = await sessionCheck();
      //  console.log("checkerbox", checker)
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    setLoginFail(null)
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
              onFocus={() => setLoginFail(null)}
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
              onFocus={() => setLoginFail(null)}
            />
            {loginFail && <Label className="erroMsg">{loginFail}</Label>}
          <div className="signButton" onClick={handleSignInSubmit}>
            Sign In
          </div>
      </Form>
    </div>
  );
}
