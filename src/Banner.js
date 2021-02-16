import React, { useEffect, useState } from 'react'
import instance from './axios';
import request from './request';
import './Banner.css'


function Banner() {
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function fetchdata() {
            const requests = await instance.get(request.fetchNetflixOriginals);
            setMovie(requests.data.results[
                Math.floor(Math.random() * requests.data.results.length - 1)
            ])
            return requests
        }
        fetchdata();
    }, [])
    console.log(movie)

function truncate(str, n){
    return str?.length > n ? str.substr(0, n-1) + "..." : str;
}

    return (
        <header className ="banner"
        style = {{backgroundSize:"cover",
        backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition:"center center",}}>

            <div className="banner_contents">
                <h1 className="banner_title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className = "banner_buttons">
                    <div className= "banner_button">Play</div>
                    <div className= "banner_button">My List</div>
                </div>

                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner_fadeBottom"/>
        </header>
    )
}

export default Banner
