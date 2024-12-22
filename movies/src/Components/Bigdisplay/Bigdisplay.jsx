import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Bigdisplay(){
    const {filmsdata, favoritedata, setFilmsdisplay} = useContext(DataContext);
    const [films, setFilms] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if(!filmsdata || !favoritedata){
            return;
        }
        setFilms(filmsdata.results?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        setFavorite(favoritedata.results?.map(movie => movie.id));
    }, []);

    function displayNext(){
        if(index + 1 < films?.length){
            setIndex(index + 1);
        }
        else{
            return
        }
    }
    return(
        <section className="bigdisplay">
            <img src={`https://image.tmdb.org/t/p/original${films[index]?.poster_path}`} alt={films[index]?.title} className="bigdisplay__background" />
            <header className="bigdisplay__header">
                <article className="bigdisplay__header--details">
                    <h2 className="bigdisplay__header--details-title">{films[index]?.title}</h2>
                    <p className="bigdisplay__header--details-year">{films[index]?.release_date.slice(0, 4)}</p>
                </article>
                <button onClick={() => {setFilmsdisplay(true)}} className="bigdisplay__header--exit">
                    <i className="fa-solid fa-xmark bigdisplay__header--exit-icon"/>
                </button>
            </header>
            <div className="bigdisplay__wrapper">
                <img onClick={displayNext} src={`https://image.tmdb.org/t/p/original${films[index]?.poster_path}`} alt={films[index]?.title} className="bigdisplay__image" />
            </div>
            <span className="bigdisplay__status">
                <article className="bigdisplay__status--item">
                    <i className="fa-solid fa-eye bigdisplay__status--item-icon bigdisplay__status--item-eye"></i>
                    <p className="bigdisplay__status--item-text">Logged</p>
                </article>
                <article className="bigdisplay__status--item">
                    <i className={`${favorite?.includes(films[index]?.id) ? 'fa-solid bigdisplay__status--item-heart' : 'fa-regular'} fa-heart bigdisplay__status--item-icon`}></i>
                    <p className="bigdisplay__status--item-text">{favorite?.includes(films[index]?.id) ? 'Liked' : 'Like'}</p>
                </article>
                <article className="bigdisplay__status--item">
                    <i className="fa-solid fa-star bigdisplay__status--item-icon"></i>
                    <span className="bigdisplay__status--item-wrapper">
                        <p className="bigdisplay__status--item-text">Rated</p>
                        <p className="bigdisplay__status--item-rating">{(films[index]?.rating / 2).toFixed(1)}</p>
                    </span>
                </article>
                <article className="bigdisplay__status--item">
                    <i className="fa-regular fa-clock bigdisplay__status--item-icon"></i>
                    <p className="bigdisplay__status--item-text">Watchlist</p>
                </article>
            </span>
        </section>
    );
}

export default Bigdisplay;