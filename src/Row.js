import React, { useEffect, useState } from "react";
import instance from "./axios";
import "./row.css";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    // if [], run once when the row loads and dont run again
    async function fetchData() {
      const req = await instance.get(fetchUrl); // instance.get("/api") looking like "https://api.themoviedb.org/3/api".
      //   console.log(req.data.results);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchUrl]);

  console.log(movies);

  return (
    <div className="row">
      {/* Titles */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* Poster Container */}
        {movies.map((movie) => (
          <img
            className="row_poster"
            src={`${base_url}${movie.poster_path}`}
            alt={movie.name}
          /> //gettting all the movie poster
        ))}
      </div>
    </div>
  );
}

export default Row;
