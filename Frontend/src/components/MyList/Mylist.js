import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import style from "./table.module.css";
import Table from "./Table.js";
import useStore from "../Store/Store";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";

const MyList = (props) => {
  const { pickedList, showadded, setShowadded } = props;

  const { userName, userid } = useStore((state) => state);

  const navigate = useNavigate();

  const back = () => {
    navigate("/");
  };

  const share = () => {
    navigate("/sharedlist/" + userid + "/" + userName);
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
            <button
              onClick={back}
              className={`${style.btn} ${style.effect04}`}
              data-sm-link-text="Back"
              target="_blank"
            >
              <span className={style.span}>Return</span>
            </button>
            <br></br>
            <button
              onClick={share}
              className={`${style.btn} ${style.effect04}`}
              data-sm-link-text="With friends"
              target="_blank"
            >
              <span className={style.span}>Share List</span>
            </button>
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
