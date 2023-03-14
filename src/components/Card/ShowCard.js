import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandText from "react-expand-text";
import StarIcon from "@mui/icons-material/Star";
import { AiFillStar } from "react-icons/ai";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useStore from "../Store/Store";
import db from "../../services/Firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";
import ReactStars from "react-rating-stars-component";
import shadows from "@mui/material/styles/shadows";

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

export default function ShowCard(props) {
  const { name, status, genres, image, rating, summary, id, fanrating, shows } =
    props;

  const { starrating, setRating } = useStore((state) => state);

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

  const [click, setClick] = useState(false);

  // const storedratings =
  //   JSON.parse(localStorage.getItem("currentRatings")) ||
  //   new Array(240).fill(0);

  // const [ratings, setRatings] = useState([]);

  const ratings = new Array(240).fill(0);
  // localStorage.setItem("currentRatings", JSON.stringify(ratings));

  const handleChange = (e) => {
    ratings[id] = e.target.value;
  };

  const save = () => {
    // localStorage.getItem("currentRatings");
    // setRatings(storedratings);
    // localStorage.setItem("currentRatings", JSON.stringify(ratings));
    console.log(ratings);
  };

  useEffect(() => {
    setClick(true);
  }, []);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{
          height: 50,
          backgroundColor: "#ddd",
          color: "black",
          marginBottom: "20px",
        }}
        avatar={
          <Avatar sx={{ bgcolor: "warning.main" }} aria-label="recipe">
            {id}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
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
      />
      <Grid item container justifyContent="center" alignItems="flex-end">
        Official Rating:{" "}
        <AiFillStar
          style={{ marginLeft: "10px", marginTop: "10px", fill: "#E6B316" }}
        />{" "}
        {rating} /10
      </Grid>

      <Grid item container justifyContent="center" alignItems="flex-end">
        Fan Rating:{" "}
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
        </Typography>
      </CardContent>

      <CardActions>
        <Grid container direction="row" justifyContent="center">
          <Grid item xs={12}>
            <Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >
              <Typography component="legend"> Overall Rating</Typography>
              <Rating
                name={id.toString()}
                value={ratings[id]}
                onChange={handleChange}
                max={10}
              />
              <button onClick={save}>save</button>
            </Box>
          </Grid>
          <Grid item xs={12} backgroundColor="#ddd">
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </Grid>
        </Grid>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Typography component="legend">Pace</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
          <Typography component="legend">Acting</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
          <Typography component="legend">Story Development</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
          <Typography component="legend">Character Development</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
          <Typography component="legend">Cinematography</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
          <Typography component="legend">Sounds and Music</Typography>
          <Rating name="customized-10" defaultValue={2} max={10} />
        </Box>
      </Collapse>
    </Card>
  );
}
