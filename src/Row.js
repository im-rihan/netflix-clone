import movieTrailer from "movie-trailer";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import instance from "./axios";
import "./row.css";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  const [trailerUrl, setTrailerUrl] = useState();

  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    // if [], run once when the row loads and dont run again
    async function fetchData() {
      const req = await instance.get(fetchUrl); // instance.get("/api") looking like "https://api.themoviedb.org/3/api".
      // console.log(req);
      // console.log(req.data.results);
      setMovies(req.data.results);
      return req;
    }
    fetchData();
  }, [fetchUrl]);

  // console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search); //https://www.youtube.com/watch?v=FDJDFNFDHR searching like this
          console.log(setTrailerUrl(urlParams.get("v")));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="row">
      {/* Titles */}
      <h2>{title}</h2>
      <div className="row_posters">
        {/* Poster Container */}
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          /> //gettting all the movie poster
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
