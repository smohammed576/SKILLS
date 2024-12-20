import { useEffect, useState } from "react";
import Header from "./Components/Header/Header";

function Profile(){
    const [favoritedata, setFavoritedata] = useState([]);

    useEffect(() => {
        (async () => {
            fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/favorite/movies?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`)
            .then((response) => response.json())
            .then((data) => {
                setFavoritedata(data);
            })
        })()
    }, []);
    
    const favoriteSets = favoritedata?.results?.map(movie => 
        <a href={`result/${movie.id}`} className="profile__favorite" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="profile__favorite--image" />
        </a>
    );
    return(
        <>
            <Header title="Vinnie"/>
            <main className="main">
                <section className="profile">
                    <div className="profile__info">
                        <img src="https://i.pinimg.com/736x/eb/a5/01/eba50138670d41fa7be56aea706882a9.jpg" alt="avatar" className="profile__info--image" />
                        <p className="profile__info--location">
                            <i className="fa-solid fa-map-pin profile__info--location-icon"></i>
                            jail
                        </p>
                        <p className="profile__info--about">whoa this isnt woodshop class?</p>
                    </div>
                    <div className="profile__favorites">
                        <h2 className="profile__favorites--title">FAVORITE FILMS</h2>
                        <span className="profile__favorites--wrapper">
                            {favoriteSets}
                        </span>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;

// https://api.themoviedb.org/3/account/%7Baccount_id%7D/favorite/movies?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7