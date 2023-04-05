import React, { useState } from "react";
import DiscreteSliderMarks from "./Slider.js";
import style from "./card.module.css";
import CardMedia from "@mui/material/CardMedia";
import { DeleteForever } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import useStore from "../Store/Store.js";
import Click from "../../assets/click.wav";
import Alert from "@mui/material/Alert";

const styles = {
  media: {
    objectFit: "scale-down",
  },
};

const HorizontalCard = ({
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
  const { userid } = useStore((state) => state);

  const playSound = () => {
    new Audio(Click).play();
  };

  const [alert, setAlert] = useState(false);
  const [deletealert, setDeletealert] = useState(false);

  const deleteShow = (id) => {
    axios
      .delete("https://trackyourseries.onrender.com/apis/shows", {
        data: {
          usid: userid,
          id: id,
        },
      })
      .then((res) => {
        setShowadded(!showadded);
        setDeletealert(true);
      })
      .then(() => {
        setTimeout(() => {
          setDeletealert(false);
        }, 2000);
      })
      .catch((err) => {});

    axios
      .delete("https://trackyourseries.onrender.com/apis/disabledarr", {
        data: {
          usid: userid,
          id: id,
        },
      })
      .then((res) => {
        setShowadded(!showadded);
      })

      .catch((err) => {});
  };

  const updateShow = (id, fanrating) => {
    axios
      .put("https://trackyourseries.onrender.com/apis/shows", {
        usid: userid,
        id: id,
        fanrating: frating,
      })
      .then(() => {
        setShowadded(!showadded);
        setAlert(true);
      })
      .then(() => {
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      })
      .catch((err) => {});
  };

  return (
    <>
      {alert ? (
        <Alert severity="success" className={style.alert}>
          Updated <strong>Show rating updated</strong>
        </Alert>
      ) : (
        <></>
      )}

      {deletealert ? (
        <Alert severity="info" className={style.alert}>
          Success— <strong>Show deleted</strong>
        </Alert>
      ) : (
        <></>
      )}
      <div className={style.container} onMouseEnter={playSound}>
        <div className={style.card}>
          <Grid container justifyContent="center">
            <Grid container justifyContent="space-evenly">
              <Grid item xs={1}></Grid>
              <Grid item xs={3}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>{index + 1}</Avatar>
              </Grid>
              <Grid item xs={5} height="80px">
                {title}
              </Grid>

              <Grid item xs={3}>
                <DeleteForever
                  sx={{ bgcolor: deepOrange[500] }}
                  className={style.deleteicon}
                  onClick={() => {
                    deleteShow(id);
                  }}
                />
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
              <DiscreteSliderMarks
                index={index}
                frating={frating}
                setRating={setRating}
              />
            </Grid>
            <Grid item xs={8}>
              <button
                onClick={() => {
                  updateShow(id);
                }}
                className="btn"
                data-sm-link-text="Save"
                target="_blank"
              >
                <span className={style.google}>Update</span>
              </button>
              <Grid item xs={12} marginTop="15px" marginBottom="15px">
                Your Rating : <span className={style.rating}>{fanrating}</span>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default React.memo(HorizontalCard);
