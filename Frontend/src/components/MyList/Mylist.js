import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./table.module.css";
import Table from "./Table.js";
import axios from "axios";
import useStore from "../Store/Store";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const MyList = (props) => {
  const { pickedList, Id, setId, showadded, setShowadded, ids, setIds } = props;

  const { userName, userid } = useStore((state) => state);

  const navigate = useNavigate();

  const back = () => {
    navigate("/list");
  };

  const share = () => {
    navigate("/sharedlist");
  };
  return (
    <Grid container justifyContent="center">
      <Grid item xs={11}>
        <h1>Welcome to {userName}'s list</h1>
      </Grid>
      <Grid item xs={1}>
        <Avatar sx={{ bgcolor: deepOrange[500], marginTop: "25px" }}>
          {pickedList.length}
        </Avatar>
      </Grid>

      <Grid item xs={12}>
        <div className={style.buttons}>
          <div className={style.container}>
            <a
              onClick={back}
              className={`${style.btn} ${style.effect04}`}
              data-sm-link-text="Back"
              target="_blank"
            >
              <span className={style.google}>Return</span>
            </a>
            <a
              onClick={share}
              className={`${style.btn} ${style.effect04}`}
              data-sm-link-text="With friends"
              target="_blank"
            >
              <span className={style.google}>Share List</span>
            </a>
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Table
          pickedList={pickedList}
          showadded={showadded}
          setShowadded={setShowadded}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(MyList);
