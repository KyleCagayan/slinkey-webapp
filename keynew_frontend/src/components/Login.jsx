import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/bts.mp4";
import logo from "../assets/logo.png";
import { client } from "../client";
import {v4 as uuidv4} from 'uuid';

export default function Login() {
  const [user, setUser] = useState({});

  const googleToken = process.env.REACT_APP_GOOGLE_API_TOKEN;
  const navigate = useNavigate();

  function handleCallbackResponse(response) {
    // console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);

    setUser(userObject);
    
    const email = userObject.email.replace('@', '');

    const doc = {
      _id: email,
      _type: "user",
      userName: userObject.name,
      image: userObject.picture,
    };

    console.log(JSON.stringify(doc));

    localStorage.setItem('user', JSON.stringify(doc));
    //creates new documents if does not exist in database
    client.createIfNotExists(doc).then(() => { 
      navigate("/", { replace: true });
    });
  };

  useEffect(() => {
    /* global google */
    // eslint-disable-next-line no-unused-expressions
    google.accounts.id.initialize({
      client_id: googleToken,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <div id="signInDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
