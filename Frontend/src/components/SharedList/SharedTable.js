import React, { useState, useEffect } from "react";
import style from "./sharedtable.module.css";
import useStore from "../Store/Store";
import { Grid } from "@mui/material";
import SharedHorizontalCard from "./SharedCard";

const SharedTable = (props) => {
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

  useEffect(() => {
    console.log("picked", pickedList);
  }, []);

  return (
    <Grid container className={style.tablecontainer}>
      {pickedList

        .sort((l, b) => b.fanrating - l.fanrating)
        .map((l, index) => {
          return (
            <Grid item xs={10} sm={5} md={4} lg={2.2}>
              <SharedHorizontalCard
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

export default React.memo(SharedTable);
