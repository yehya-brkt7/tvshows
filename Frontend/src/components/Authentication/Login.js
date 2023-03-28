import React from "react";
import style from "./login.module.css";
import Grid from "@mui/material/Grid";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../services/Firebase"; // update path to your firestore config
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import useStore from "../Store/Store";
import axios from "axios";

const Login = (props) => {
  const { setToken, setUser, setUserid } = useStore((state) => state);
  const navigate = useNavigate();

  const googleHandler = async (e) => {
    e.preventDefault();

    provider.setCustomParameters({ prompt: "select_account" });
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setToken({ token });

        // The signed-in user info.

        const user = result.user;

        setUser(user);

        axios
          .post("https://trackyourseries.onrender.com/apis/user", {
            uid: user.uid,
          })
          .then(() => {
            console.log(user);
            setUserid(user.uid);
          });

        navigate("/list");

        // redux action? --> dispatch({ type: SET_USER, user });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        // navigate("/list");
        // ...
      });
  };

  const image = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    height: "382px",
    border: "2px solid black",
    borderRadius: "15px",
    marginTop: "200px",
    border: "1px solid white",
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          container
          justifyContent="center"
          xs={10}
          sm={6}
          md={5}
          lg={4}
          style={image}
        >
          <Grid item xs={12} marginTop="293px">
            <div className={style.buttons}>
              <div className={style.container}>
                <a
                  onClick={googleHandler}
                  className={`${style.btn} ${style.effect04}`}
                  data-sm-link-text="LOGIN"
                  target="_blank"
                >
                  <span className={style.google}>Google</span>
                </a>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
