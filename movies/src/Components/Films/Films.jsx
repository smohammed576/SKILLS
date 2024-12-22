import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Bigdisplay from "../Bigdisplay/Bigdisplay";
import DataContext from "../../hooks/context/DataContext";

function Films(){
    const {filmsdata, favoritedata, filmsdisplay, setFilmsdisplay} = useContext(DataContext);
    const [films, setFilms] = useState([]);
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        if(!filmsdata || !favoritedata){
            return;
        }
        setFilms(filmsdata.results?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        setFavorite(favoritedata.results?.map(movie => movie.id));
    }, [filmsdata]);

    const ratedSets = films?.map(movie => {
        const ratingAmount = movie.rating / 2;
        const getStars = Array.from({length: ratingAmount}, (_,index) => 
            <i className="fa-solid fa-star rated__rating--star" key={index}></i>
        );
        return(
            <figure className="rated" key={movie.id}>
                <a href={`/result/${movie.id}`} className="rated__link">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="rated__link--image" />
                </a>
                <span className="rated__rating">
                    {getStars}
                    {Number.isInteger(ratingAmount) ? '' : <p className="rated__rating--half">1/2</p>}
                    {favorite.includes(movie.id) ? <i className="fa-solid fa-heart rated__rating--heart"></i> : ''}
                </span>
            </figure>
        );
    });

    function displayLarge(){
        setFilmsdisplay(false);
    }

    return filmsdisplay ? (
        <>
            <Header title="Films">
                <button onClick={displayLarge} className="header__movies">O</button>
            </Header>
            <main className="main">
                <section className="profile__rated">
                    {ratedSets}
                </section>
            </main>
        </>
    )
    :
    (
        <Bigdisplay/>
    )
}

export default Films;