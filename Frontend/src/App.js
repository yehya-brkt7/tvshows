import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./components/ShowsList/List";
import Login from "./components/Authentication/Login";
import MyList from "./components/MyList/Mylist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import useStore from "./components/Store/Store";
//test
function App() {
  const { userid } = useStore((state) => state);
  const [pickedList, setPickedList] = useState([]);

  const [ids, setIds] = useState([]);

  const [showadded, setShowadded] = useState();

  const [Id, setId] = useState();

  useEffect(() => {
    axios
      .get("https://trackyourseries.vercel.app/apis/shows", {
        usid: userid,
      })
      .then((res) => {
        setPickedList(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });

    axios
      .get("https://trackyourseries.vercel.app/apis/disabledarr", {
        usid: userid,
      })
      .then((res) => {
        setIds(res.data);
      })
      .catch((err) => {});
  }, [showadded, userid]);

  useEffect(() => {
    console.log("ids", ids);
  }, [ids]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/list"
            element={
              <List
                pickedList={pickedList}
                setPickedList={setPickedList}
                showadded={showadded}
                setShowadded={setShowadded}
                ids={ids}
                setIds={setIds}
                Id={Id}
                setId={setId}
              />
            }
          />
          <Route
            path="/mylist"
            element={
              <MyList
                pickedList={pickedList}
                Id={Id}
                setId={setId}
                showadded={showadded}
                setShowadded={setShowadded}
                ids={ids}
                setIds={setIds}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
