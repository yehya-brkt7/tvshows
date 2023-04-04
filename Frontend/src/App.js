import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Authentication/Login";
import MyList from "./components/MyList/Mylist";
import SharedList from "./components/SharedList/SharedList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import useStore from "./components/Store/Store";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { GlobalDebug } from "./utils/consoleremove";

const LazyList = React.lazy(() => import("./components/ShowsList/List"));

if (process.env.REACT_APP_NODE_ENV != "development") {
  // GlobalDebug(false);
  // console.log = function no_console() {};

  disableReactDevTools();
}

function App() {
  const { userid } = useStore((state) => state);
  const [pickedList, setPickedList] = useState([]);

  const [ids, setIds] = useState([]);

  const [showadded, setShowadded] = useState();

  const [Id, setId] = useState();

  useEffect(() => {
    const axios = require("axios");
    let data = "";

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://trackyourseries.onrender.com/apis/shows/" + userid,
      headers: {},
      data: data,
    };

    if (userid != "") {
      axios
        .request(config)
        .then((response) => {
          setPickedList(response.data);
        })
        .catch((error) => {});
    }
    ////////////////////////////////////////

    if (userid != "") {
      axios
        .get("https://trackyourseries.onrender.com/apis/disabledarr", {
          params: {
            usid: userid,
          },
        })
        .then((res) => {
          setIds(res.data);
        })
        .catch((err) => {});
    }
  }, [showadded]);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              <Login showadded={showadded} setShowadded={setShowadded} />
            }
          /> */}
          <Route
            path="/"
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
                <Login showadded={showadded} setShowadded={setShowadded} />
              )
            }
          />
          <Route
            path="/mylist"
            element={
              userid != "" ? (
                <MyList
                  pickedList={pickedList}
                  showadded={showadded}
                  setShowadded={setShowadded}
                />
              ) : (
                <Login showadded={showadded} setShowadded={setShowadded} />
              )
            }
          />
          <Route path="/sharedlist/:userid/:name" element={<SharedList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
