import React, { useEffect, useState } from "react";
import style from "./login.module.css";
import Grid from "@mui/material/Grid";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, provider } from "../../services/Firebase"; // update path to your firestore config
import { useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";
import useStore from "../Store/Store";
import axios from "axios";
import CircularIndeterminate from "./loading";

const Login = ({ showadded, setShowadded }) => {
  const { user, fetch, setToken, setUser, setUserid, setUserName } = useStore(
    (state) => state
  );
  const navigate = useNavigate();

  const url = "Shows.Json";
  useEffect(() => {
    fetch(url);
  }, []);

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

        //if user is new

        if (getAdditionalUserInfo(result).isNewUser) {
          axios
            .post("https://trackyourseries.onrender.com/apis/user", {
              uid: user.uid,
              name: user.displayName,
            })
            .then(() => {
              setUserid(user.uid);
              setUserName(user.displayName);
              setShowadded(!showadded);

              navigate("/");
            })
            .catch((err) => {});
        }

        //if user already exists
        else {
          axios
            .get("https://trackyourseries.onrender.com/apis/user/" + user.uid)
            .then((res) => {
              setUserid(res.data[0].uid);
              setUserName(res.data[0].name);
              setShowadded(!showadded);
              navigate("/");
            });
        }
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

  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(true);
        axios
          .get("https://trackyourseries.onrender.com/apis/user/" + user.uid)
          .then((res) => {
            setUserid(res.data[0].uid);
            setUserName(res.data[0].name);
            setShowadded(!showadded);
            navigate("/");
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  const image = {
    backgroundImage: `url(${bg})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    backgroundSize: "auto",
    backgroundRepeat: "no-repeat",
    height: "382px",
    border: "2px solid black",
    borderRadius: "15px",
    marginTop: "50px",
    border: "1px solid white",
  };

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={12} className={style.loader}>
          {" "}
          {loading ? <CircularIndeterminate /> : <></>}
        </Grid>

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
                <button
                  onClick={googleHandler}
                  className={`${style.btn} ${style.effect04}`}
                  data-sm-link-text="with google"
                  target="_blank"
                >
                  <span className={style.google}>Login</span>
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Login);
