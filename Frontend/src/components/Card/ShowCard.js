import * as React from "react";
import { useRef } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandText from "react-expand-text";
import { AiFillStar } from "react-icons/ai";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";
import useStore from "../Store/Store";
import style from "./showcard.module.css";
import axios from "axios";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const styles = {
  media: {
    objectFit: "scale-down",
  },
};

const ShowCard = (props) => {
  const {
    name,
    genres,
    image,
    rating,
    summary,
    id,
    index,
    showadded,
    setShowadded,
    ids,
  } = props;

  const { userid } = useStore((state) => state);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const TEXT_COLLAPSE_OPTIONS = {
    collapse: false,
    collapseText: "... show more",
    expandText: "show less",
    minHeight: 100,
    maxHeight: 200,
    textStyle: {
      color: "blue",
      fontSize: "20px",
    },
  };

  const boxSX = {
    "&:hover": {
      transform: `scale(1.05)`,
      transition: `all .3s ease-in-out`,
    },

    "&:not( :hover )": {
      transform: `scale(1)`,
      transition: `all .3s ease-in-out`,
    },
  };

  let btnRef = useRef();

  const pickShow = () => {
    axios
      .post("https://trackyourseries.onrender.com/apis/shows", {
        title: name,
        genres: genres,
        rating: rating,
        fanrating: 5,
        id: id,
        usid: userid,
        image: image,
      })
      .then(() => {
        setShowadded(!showadded);
        NotificationManager.success("✓", "Show added to List!");
      });

    axios
      .post("https://trackyourseries.onrender.com/apis/disabledarr", {
        id: id,
        usid: userid,
      })
      .then((res) => {
        // setIds([...ids, id]);

        setShowadded(!showadded);
      })
      .catch((err) => {});

    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }
  };

  return (
    <>
      <NotificationContainer />
      <Card sx={boxSX}>
        <CardHeader
          sx={{
            height: 50,
            backgroundColor: "#ddd",
            color: "black",
            marginBottom: "20px",
          }}
          avatar={
            <Avatar sx={{ bgcolor: "warning.main" }} aria-label="recipe">
              {index}
            </Avatar>
          }
          titleTypographyProps={{ variant: "h6" }}
          title={name}
          subheader={genres.map((genre, index) => {
            return (
              <span>
                {genre} {index === genres.length - 1 ? "" : ", "}
              </span>
            );
          })}
        />
        <CardMedia
          component="img"
          height="194"
          image={image}
          alt="Paella dish"
          marginTop="10px"
          style={styles.media}
          loading="lazy"
        />

        <Grid item container justifyContent="center" alignItems="flex-end">
          Official Rating:{" "}
          <AiFillStar
            style={{ marginLeft: "10px", marginTop: "10px", fill: "#E6B316" }}
          />{" "}
          {rating} /10
        </Grid>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ cursor: "pointer" }}
          >
            <ExpandText maxLength={50} className="expand" text={summary} />
            ......<b>click to view</b>
          </Typography>
        </CardContent>

        <CardActions>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={6}>
              <div className={style.buttons}>
                <div className={style.container}>
                  <button
                    onClick={pickShow}
                    ref={btnRef}
                    disabled={
                      ids
                        .filter((obj) => obj.usid === userid)
                        .findIndex((obj) => obj.id === id) !== -1
                        ? true
                        : false
                    }
                    className="btn"
                    data-sm-link-text="Pick series"
                    target="_blank"
                  >
                    <span className={style.google}>Add To List</span>
                  </button>
                </div>
              </div>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default React.memo(ShowCard);
