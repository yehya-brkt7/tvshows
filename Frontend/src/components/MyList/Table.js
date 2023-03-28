import React, { useState } from "react";
import style from "./table.module.css";
import useStore from "../Store/Store";
import { Grid } from "@mui/material";
import HorizontalCard from "./Card";

const Table = (props) => {
  const { pickedList, showadded, setShowadded } = props;

  const { userid } = useStore((state) => state);

  const [frating, setRating] = useState();

  const styles = {
    media: {
      objectFit: "fill",
      width: "120px",
      height: "90px",
      border: "1px solid black",

      marginTop: "10px",
    },
    labels: {
      fontWeight: "bold",
      textAlign: "center",
      verticalAlign: "sub",
    },
  };

  return (
    <Grid container className={style.tablecontainer}>
      {pickedList
        .filter((l) => l.usid === userid)
        .sort((l, b) => b.fanrating - l.fanrating)
        .map((l, index) => {
          return (
            <Grid item xs={10} sm={5} md={4} lg={2.2}>
              <HorizontalCard
                index={index}
                title={l.title}
                rating={l.rating}
                fanrating={l.fanrating}
                image={l.image}
                setRating={setRating}
                frating={frating}
                showadded={showadded}
                setShowadded={setShowadded}
                id={l.id}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default React.memo(Table);
