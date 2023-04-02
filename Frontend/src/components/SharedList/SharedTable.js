import React from "react";
import style from "./sharedtable.module.css";
import { Grid } from "@mui/material";
import SharedHorizontalCard from "./SharedCard";

const SharedTable = (props) => {
  const { pickedList, uname } = props;

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
                uname={uname}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default React.memo(SharedTable);
