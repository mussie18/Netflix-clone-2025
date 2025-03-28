import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import styles from "./banner.module.css";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ]
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={styles.banner_contents}>
        <h1 className={styles.banner_title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className={styles.banner_buttons}>
          <button className={`${styles.banner_button} ${styles.play}`}>
            Play
          </button>
          <button className={styles.banner_button}>My List</button>
        </div>
        <h1 className={styles.banner_description}>
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className={styles.banner_fadeBottom} />
    </div>
  );
};

export default Banner;
