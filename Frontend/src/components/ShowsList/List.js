import React, { useEffect, useState } from "react";
import useStore from "../Store/Store";
import Grid from "@mui/material/Grid";
import { signOut } from "firebase/auth";
import { auth } from "../../services/Firebase";
import { useNavigate } from "react-router-dom";
import style from "./list.module.css";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import axios from "axios";
import SkeletonCard from "./Skeleton";
import Avatar from "@mui/material/Avatar";

const LazyCard = React.lazy(() => import("../Card/ShowCard"));

const List = ({
  pickedList,
  setPickedList,
  showadded,
  setShowadded,
  ids,
  setIds,
  Id,
  setId,
}) => {
  const { fetch, shows, user, userid, setUserName } = useStore(
    (state) => state
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://trackyourseries.onrender.com/apis/user", {
        uid: userid,
      })
      .then((res) => {});
  }, [user]);

  const [sortedShows, setSortedshows] = useState([]);

  const url = "Shows.Json";
  useEffect(() => {
    fetch(url);
  }, []);

  useEffect(() => {
    const sorted = shows.sort((a, b) => b.rating.average - a.rating.average);

    setSortedshows(sorted);
  }, [shows]);

  const googleHandler = async (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        navigate("/");
        setPickedList([]);
        localStorage.removeItem("isLoggedin");
      })
      .catch((error) => {});
  };

  const header = {
    backgroundColor: "red",
  };

  const viewList = () => {
    navigate("/mylist");
  };

  const [filter, setFilter] = useState("");

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={4}>
          <h2>Tv Shows List</h2>
        </Grid>

        <Grid item xs={12} sm={4}>
          <div className={style.buttons}>
            <div className={style.container}>
              <a
                onClick={viewList}
                className={`${style.btn} ${style.effect04}`}
                data-sm-link-text="view list"
                target="_blank"
              >
                <span className={style.google}>Your List</span>
              </a>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} container justifyContent="center" sm={4}>
          <div className={style.buttons}>
            <div className={style.container}>
              <a
                onClick={googleHandler}
                className={`${style.btn} ${style.effect04}`}
                data-sm-link-text="Exit"
                target="_blank"
              >
                <span className={style.google}>LogOut</span>
                <Avatar
                  className={style.avatarimage}
                  sx={{ marginTop: "25px" }}
                >
                  {" "}
                  <img src={user.photoURL} referrerpolicy="no-referrer" />
                </Avatar>
              </a>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Toolbar>
          <div className={style.searchcontainer}>
            <SearchIcon className={style.search} />
            <TextField
              inputProps={{ style: { fontSize: "1.5em", color: "gray" } }}
              InputLabelProps={{
                style: { fontSize: "1.5em", color: "gray" },
              }}
              label="Search"
              variant="standard"
              onChange={handleSearchChange}
            />
          </div>
        </Toolbar>
      </Grid>

      <Grid container justifyContent="center" spacing={3}>
        {sortedShows.map((show, index) => {
          return (
            show.name.toLowerCase().includes(filter) && (
              <>
                <Grid item xs={10} sm={6} md={4} lg={3} key={show.id}>
                  <React.Suspense fallback={<SkeletonCard />}>
                    <LazyCard
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
                      pickedList={pickedList}
                      setPickedList={setPickedList}
                      showadded={showadded}
                      setShowadded={setShowadded}
                      ids={ids}
                      setIds={setIds}
                      Id={Id}
                      setId={setId}
                    />
                  </React.Suspense>
                </Grid>
              </>
            )
          );
        })}
      </Grid>
    </>
  );
};

export default React.memo(List);
