import React, { useEffect } from "react";
import ShowCard from "../Card/ShowCard";
import useStore from "../Store/Store";

const List = () => {
  const { fetch, shows } = useStore((state) => state);

  const url = "Shows.Json";

  useEffect(() => {
    fetch(url);
  }, []);

  return (
    <>
      {shows.map((show) => {
        return (
          <>
            <ShowCard name={show.name} />
          </>
        );
      })}
    </>
  );
};

export default List;
