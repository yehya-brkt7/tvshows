import React, { useEffect } from "react";
import ShowCard from "../Card/ShowCard";
import useStore from "../Store/Store";
import Grid from "@mui/material/Grid";
import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase"; // update path to your firestore config
import { useNavigate } from "react-router-dom";

const List = () => {
  const { fetch, shows } = useStore((state) => state);

  const navigate = useNavigate();

  const url = "Shows.Json";

  useEffect(() => {
    fetch(url);
  }, []);

  const googleHandler = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const header = {
    backgroundColor: "red",
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <h2>Tv Shows List</h2>
        </Grid>
        <Grid item xs={6}>
          <div class="buttons">
            <div class="container">
              <a
                onClick={googleHandler}
                class="btn effect04"
                data-sm-link-text="Exit"
                target="_blank"
              >
                <span className="google">LogOut</span>
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" spacing={3}>
        {shows.map((show, index) => {
          return (
            <>
              <Grid item xs={10} sm={6} md={4} lg={3} key={show.id}>
                <ShowCard
                  name={show.name}
                  status={show.status}
                  genres={show.genres}
                  image={show.image.original}
                  rating={show.rating.average}
                  summary={show.summary}
                  id={show.id}
                  show={show}
                  index={index + 1}
                  fanrating={show.runtime}
                  shows={shows}
                />
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default List;
