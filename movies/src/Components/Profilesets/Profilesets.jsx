import { useContext, useEffect } from "react";
import DataContext from "../../hooks/context/DataContext";

function Profileset(){
    const {profiledata} = useContext(DataContext);
    const favoriteSets = profiledata["favorite/movies"]?.results?.slice(0, 4).map(movie => 
        <a href={`result/${movie.id}`} className="profile__item" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="profile__item--image" />
        </a>
    );
    
    const recentSets = profiledata["rated/movies"]?.results?.slice(0, 4).map(movie => {
        const ratingAmount = movie.rating / 2;
        const getStars = Array.from({length: ratingAmount}, (_,index) => 
            <i className="fa-solid fa-star profile__item--rating-icon" key={index}></i>
        );
        return(
            <article className="profile__item" key={movie.id}>
                <a href={`result/${movie.id}`} className="profile__item--link">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="profile__item--image" />
                </a>
                <span className="profile__item--rating">
                    {getStars}
                    {Number.isInteger(ratingAmount) ? '' : <p className="profile__item--rating-half">1/2</p>}
                </span>
            </article>
        );
    }
    );
    return(
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
    );
}

function Dairy(){
    
}

function Lists(){

}

function Watchlist(){
    const {profiledata} = useContext(DataContext);
    
    console.log(profiledata)
    useEffect(() => {
        if(!profiledata){
            return;
        }
    }, [])

    const watchlistSets = profiledata["watchlist/movies"]?.results?.map(movie => 
        <figure className="actor__film" key={movie.id}>
            <a href={`/result/${movie.id}`} className="actor__film--link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="actor__film--link-image" />
            </a>
        </figure>
    );

    return(
        <section className="profile">
            <div className="profile__films">
                {watchlistSets}
            </div>
        </section>
    );
}

export {Profileset};

export {Dairy};

export {Lists};

export {Watchlist};