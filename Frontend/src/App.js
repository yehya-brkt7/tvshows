import React, { useState, useEffect } from "react";
import "./App.css";
// import List from "./components/ShowsList/List";
import Login from "./components/Authentication/Login";
import MyList from "./components/MyList/Mylist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import useStore from "./components/Store/Store";
//test

const LazyList = React.lazy(() => import("./components/ShowsList/List"));
function App() {
  const { userid } = useStore((state) => state);
  const [pickedList, setPickedList] = useState([]);

  const [ids, setIds] = useState([]);

  const [showadded, setShowadded] = useState();

  const [Id, setId] = useState();

  useEffect(() => {
    axios
      .get("https://trackyourseries.onrender.com/apis/shows", {
        usid: userid,
      })
      .then((res) => {
        setPickedList(res.data);
      })
      .catch((err) => {});

    axios
      .get("https://trackyourseries.onrender.com/apis/disabledarr", {
        usid: userid,
      })
      .then((res) => {
        setIds(res.data);
      })
      .catch((err) => {});
  }, [showadded, userid]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/list"
            element={
              userid != "" ? (
                <React.Suspense fallback="Loading...">
                  <LazyList
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
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/mylist"
            element={
              userid != "" ? (
                <MyList
                  pickedList={pickedList}
                  Id={Id}
                  setId={setId}
                  showadded={showadded}
                  setShowadded={setShowadded}
                  ids={ids}
                  setIds={setIds}
                />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
