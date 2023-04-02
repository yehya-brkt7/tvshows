import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import SharedTable from "./SharedTable.js";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import style from "./sharedtable.module.css";
import { ShareSocial } from "react-share-social";

const SharedList = (props) => {
  const params = useParams();

  const [pickedList, setPickedList] = useState([]);

  useEffect(() => {
    const axios = require("axios");
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://trackyourseries.onrender.com/apis/shows/" + params.userid,
      headers: {},
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setPickedList(response.data);
      })
      .catch((error) => {});

    ////////////////////////////////////////
  }, []);

  const navigate = useNavigate();

  const back = () => {
    navigate("/mylist");
  };

  const location = useLocation();

  const url = "https://trackyourseries.vercel.app/" + location.pathname;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <h1>Welcome to {params.name}'s list</h1>
      </Grid>

      <Grid item xs={1}>
        <Avatar sx={{ bgcolor: deepOrange[500], marginTop: "25px" }}>
          {pickedList.length}
        </Avatar>
      </Grid>
      <Grid item xs={10} sm={8} md={6}>
        <h4 className={style.header}>Share it with your friends</h4>
        <ShareSocial
          url={url}
          socialTypes={["facebook", "twitter", "reddit", "whatsapp"]}
        />
      </Grid>

      <Grid item xs={12} marginTop="50px">
        <a
          onClick={back}
          className={`${style.btn} ${style.effect04}`}
          data-sm-link-text="Back"
          target="_blank"
        >
          <span className={style.google}>Return</span>
        </a>
      </Grid>

      <Grid item xs={12} sm={12} marginTop="50px">
        <SharedTable pickedList={pickedList} uname={params.name} />
      </Grid>
    </Grid>
  );
};

export default React.memo(SharedList);
