import React from "react";
import style from "./sharedcard.module.css";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import useStore from "../Store/Store.js";
import Click from "../../assets/click.wav";

const styles = {
  media: {
    objectFit: "scale-down",
  },
};

const SharedHorizontalCard = ({
  index,
  title,
  rating,
  fanrating,
  image,
  frating,
  setRating,
  showadded,
  setShowadded,
  id,
}) => {
  const { userName } = useStore((state) => state);

  const playSound = () => {
    new Audio(Click).play();
  };

  return (
    <>
      <div className={style.container} onMouseEnter={playSound}>
        <div className={style.card}>
          <Grid container justifyContent="center">
            <Grid container justifyContent="space-evenly">
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{index + 1}</Avatar>
              </Grid>
              <Grid item xs={5}>
                {title}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                height="194"
                image={image}
                alt="Paella dish"
                style={styles.media}
                loading="lazy"
              />
            </Grid>
            <Grid item container justifyContent="center" xs={10}>
              IMDB: {rating}
            </Grid>
            <Grid item xs={8}>
              <Grid item xs={12} marginTop="15px" marginBottom="15px">
                {userName}'s Rating : {fanrating}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default React.memo(SharedHorizontalCard);
