import React from 'react';
import './Banner.css';
import axios from '../../axios';
import { useEffect, useState } from 'react';
import { API_KEY, IMAGE_URL } from '../../constants/constants';

const Banner = () => {
  const [movie, setMovie] = useState('');

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(`trending/all/day?api_key=${API_KEY}`);
        setMovie(
          data.results.sort(() => {
            return 0.5 - Math.random();
          })[0]
        );
        console.log('neww', data.results);
      } catch (error) {
        throw new error(error.response.data.message);
      }
    })();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${movie ? IMAGE_URL + movie.backdrop_path : ''})`,
      }}
      className="conatainer-fluid banner"
    >
      <div className="row pt-5 d-flex justify-content-around">
        <div className="col-lg-4 p-4">
          <div className="title text-light">
            <h1>
              {movie ? movie.original_title : movie.original_name || movie.name}
            </h1>
          </div>
          <div className="buttons">
            <button className="play rounded m-1">
              <ion-icon name="play"></ion-icon> <span>Play</span>
            </button>
            <button className="my-list rounded m-1">
              <ion-icon name="add"></ion-icon>
              <span> My List</span>
            </button>
          </div>
          <div className="description text-light mt-4">
            <p>{movie ? movie.overview : ''}</p>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default Banner;
