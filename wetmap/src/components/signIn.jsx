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
import InputBase from "@mui/material/InputBase";
import GoogleIcon from "../images/google.svg";
import FacebookIcon from "../images/facebook.svg";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "react-facebook-login";
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
} from 'reactjs-social-login'
import {
  FacebookLoginButton,
  GoogleLoginButton,
  createButton,
  createSvgIcon
} from 'react-social-login-buttons'
import { diveSites } from "../supabaseCalls/diveSiteSupabaseCalls";

let emailVar = false;
let passwordVar = false;

export default function SignInRoute() {
  const { activeSession, setActiveSession } = useContext(SessionContext);
  const [profile, setProfile] = useState(null)
  const [formVals, setFormVals] = useState({
    email: "",
    password: "",
  });

  const [loginFail, setLoginFail] = useState(null);

  const [formValidation, SetFormValidation] = useState({
    emailVal: false,
    passwordVal: false,
  });

  const configFB = {
    text: "Log in with Facebook",
    icon: createSvgIcon(FacebookIcon),
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#538dbd", width: "235px"},
    activeStyle: { background: "#293e69" }
  };

  const configGG = {
    text: "Log in with Google",
    icon: createSvgIcon(GoogleIcon),
    iconFormat: name => `fa fa-${name}`,
    style: { background: "#538dbd", width: "235px" },
    activeStyle: { background: "#293e69" }
  };

  const MyFacebookLoginButton = createButton(configFB);
  const MyGoogleLoginButton = createButton(configGG);



  async function getGoogleUserData(token) {
    if (!token) return;
    console.log("google token is", token)
    try {
      const res = await fetch(`https://www.googleapis.com/userinfo/v2/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await res.json();
      console.log("google user is", user)
      handleOAuthSubmit(user)
      
    } catch (err) {
      console.log("error", err);
    }
  }

  async function getFacebookUserData(token2) {
    if (!token2) return;
    console.log("facebook token is", token2)
    try {
      const res2 = await fetch(`https://graph.facebook.com/me?access_token=${token2}&fields=id,name,email`);
      const user2 = await res2.json();
      console.log("facebook user is", user2)
      handleOAuthSubmit(user2)

    } catch (err) {
      console.log("error", err);
    }
  }

  const handleOAuthSubmit = async (user) => {

    let Fname;
    let LName;

    if(user.name){
      Fname = user.name.split(" ").slice(0, 1);
      LName = user.name.split(" ").slice(-1);
    } else {
      if (user.family_name) {
        Fname = user.given_name;
        LName = user.family_name;
      } else {
        Fname = user.given_name.split(" ").slice(0, -1).join(" ");
        LName = user.given_name.split(" ").slice(-1)[0];
      }
    }

    let Pword = user.id;
    let MailE = user.email;

    let accessToken = await OAuthSignIn({
      password: Pword,
      email: MailE,
      firstName: Fname,
      lastName: LName,
    });

    if (accessToken) {
      await AsyncStorage.setItem("token", JSON.stringify(accessToken));
      setActiveSession(accessToken);
    } else {
      setLoginFail("The credentials you supplied are not valid");
      return;
    }
  };

  async function OAuthSignIn(formVals) {
    let accessToken = await signInStandard(formVals);
    if (accessToken) {
      await localStorage.setItem("token", JSON.stringify(accessToken));
      setActiveSession(accessToken);
    } else {
      let registrationToken = await register(formVals);
      await localStorage.setItem("token", JSON.stringify(registrationToken));
      setActiveSession(registrationToken);
    }
  }

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
      setLoginFail("Please fill out both email and password");
      return;
    } else {
      let accessToken = await signInStandard(formVals);
      if (accessToken) {
        await localStorage.setItem("token", JSON.stringify(accessToken));
        setActiveSession(accessToken);
      } else {
        setLoginFail("The credentials you supplied are not valid");
        return;
      }
      let checker = await sessionCheck();
      //  console.log("checkerbox", checker)
    }
  };

  const handleChange = (e) => {
    setFormVals({ ...formVals, [e.target.name]: e.target.value });
    setLoginFail(null);
  };

  return (
    <div className="containerDiv">
      <Form onSubmit={handleSignInSubmit} className="formstyle">
        <InputBase
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
          inputProps={{
            style: {
              textAlign: "center",
              fontFamily: "Indie Flower",
              textOverflow: "ellipsis",
              backgroundColor: "#538dbd",
              height: "25px",
              color: "#F0EEEB",
              width: "170px",
              borderRadius: "10px",
              boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
            },
          }}
        />

        <InputBase
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
          inputProps={{
            style: {
              textAlign: "center",
              fontFamily: "Indie Flower",
              textOverflow: "ellipsis",
              backgroundColor: "#538dbd",
              height: "25px",
              color: "#F0EEEB",
              width: "170px",
              borderRadius: "10px",
              boxShadow: "inset 0 0 15px rgba(0,0,0, 0.5)",
            },
          }}
        />

        <div className="Oaths">

        <div className="OAuthButton">
        <LoginSocialGoogle
            isOnlyGetToken
            client_id={'803518830612-ullrhq9lgcfe9ornlc5tffhtch7o5t07.apps.googleusercontent.com' || ''}
            onResolve={({ provider, data }) => {
              setProfile(data)
              getGoogleUserData(data.access_token)
              console.log("google",data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GoogleLoginButton style={{width: "235px", height: "40px"}}/>
          </LoginSocialGoogle >
          </div> 

        <div className="OAuthButton">
        <LoginSocialFacebook
            isOnlyGetToken
            appId={692861552452156 || ''}
            state={false}
            onResolve={({ provider, data }) => {
              setProfile(data)
              getFacebookUserData(data.accessToken)
              console.log("facebook",data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <FacebookLoginButton style={{width: "235px", height: "40px"}}/>
          </LoginSocialFacebook>
          </div> 
        </div>

        {loginFail && <Label className="erroMsg">{loginFail}</Label>}
        <div className="signButton" onClick={handleSignInSubmit}>
          Sign In
        </div>
      </Form>
    </div>
  );
}
