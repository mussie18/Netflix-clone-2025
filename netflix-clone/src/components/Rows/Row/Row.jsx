import { useEffect, useState } from "react";
import styles from "./row.module.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";
const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const base_url = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    (async () => {
      try {
        console.log(fetchUrl);
        const request = await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
      } catch (error) {
        console.log("ERROR :", error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name).then(
        (url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams.get("v"));
          setTrailerUrl(urlParams.get("v"));
        }
      );
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <section className={styles.row}>
      <h1>{title}</h1>
      <div className={styles.row_posters}>
        {movies?.map((movie, index) => (
          <img
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            className={`${styles.row_poster} ${
              isLargeRow && styles.row_posterLarge
            }`}
            onClick={() => handleClick(movie)}
            key={index}
          />
        ))}
      </div>
      <div>
        {trailerUrl && (
          <YouTube
            style={{ padding: "40px" }}
            videoId={trailerUrl}
            opts={opts}
          />
        )}
      </div>
    </section>
  );
};

export default Row;
