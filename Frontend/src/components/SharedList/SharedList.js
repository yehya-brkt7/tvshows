import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import SharedTable from "./SharedTable.js";
import useStore from "../Store/Store";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import style from "./sharedtable.module.css";

const SharedList = (props) => {
  const { pickedList, showadded, setShowadded } = props;

  const { userName, userid } = useStore((state) => state);

  const navigate = useNavigate();

  const back = () => {
    navigate("/mylist");
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
        <SharedTable
          pickedList={pickedList}
          showadded={showadded}
          setShowadded={setShowadded}
        />
      </Grid>
    </Grid>
  );
};

export default React.memo(SharedList);
