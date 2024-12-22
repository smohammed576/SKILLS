import { useContext, useEffect, useState } from "react";
import Header from "./Components/Header/Header";
import DataContext from "./hooks/context/DataContext";

function Profile(){
    const {profiledata, favoritedata, filmsdata} = useContext(DataContext);

    const favoriteSets = favoritedata?.results?.slice(0, 4).map(movie => 
        <a href={`result/${movie.id}`} className="profile__item" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="profile__item--image" />
        </a>
    );

    const recentSets = filmsdata?.results?.slice(0, 4).map(movie => 
        <a href={`result/${movie.id}`} className="profile__item" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="profile__item--image" />
        </a>
    );

    return(
        <>
            <Header title={profiledata.name}/>
            <main className="main">
                <section className="profile">
                    <div className="profile__info">
                        <img src={`https://image.tmdb.org/t/p/original${profiledata?.avatar?.tmdb?.avatar_path}`} alt="avatar" className="profile__info--image" />
                        <p className="profile__info--location">
                            <i className="fa-solid fa-map-pin profile__info--location-icon"></i>
                            jail
                        </p>
                        <p className="profile__info--about">whoa this isnt woodshop class?</p>
                    </div>
                    <div className="profile__list">
                        <h2 className="profile__list--title">FAVORITE FILMS</h2>
                        <span className="profile__list--wrapper">
                            {favoriteSets}
                        </span>
                    </div>
                    <div className="profile__list">
                        <h2 className="profile__list--title">RECENT ACTIVITY</h2>
                        <span className="profile__list--wrapper">
                            {recentSets}
                        </span>
                    </div>
                    <div className="profile__list">
                        <article className="profile__list--item">
                            <a href={`/profile/films`} className="profile__list--item-link">films</a>
                        </article>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Profile;