import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

function Options(){
    const {moviedata, displayoptions, setDisplayoptions, setAddtype, setOptions, setWatchid, watcheddata, setListoptions, setAddremove, setRatingoptions} = useContext(DataContext);
    const ratingAmount = moviedata?.account_states?.rated?.value / 2;
    console.log(moviedata.account_states?.favorite);
    const isFavorite = !moviedata?.account_states?.favorite;
    const inWatchlist = !moviedata?.account_states?.watchlist;
    const isWatched = !watcheddata?.item_present;
    console.log(ratingAmount);

    
    function addRating(rating){
        console.log(rating);
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8'},
            body: `{"value":${rating * 2}}`
        }
        setRatingoptions(options);
    }

    // const getStars = Array.from({length: ratingAmount}, (_,index) => 
    //     <i onClick={() => {addRating(index + 1)}} onDoubleClick={() => {addRating(index + 1.5)}} className="fa-solid fa-star result__options--item-star" key={index}></i> 
    // );
    // const getEmptystars = Array.from({length: 6 - ratingAmount}, (_,index) => 
    //         <>
    //             {Number.isInteger(ratingAmount) || Math.floor(5 - ratingAmount) === index && 5 - ratingAmount !== 0.5 ? <i className="fa-regular fa-star result__options--item-empty" key={index}></i> : <i className="fa-solid fa-star-half-stroke result__options--item-half" key={index}></i>}
    //         </>
    // );

    // const getStars = Array.from({length: 5}, (_,index) => {
    //         return(
    //             <i className={`fa-regular fa-star result__options--item-star`} key={index}></i>
    //         );
    //     }
    // );

    const stars = 
         [...Array(5)].map((star, index) => 
            index < ratingAmount ? (
                <i onDoubleClick={() => {addRating(index + 0.5)}} onClick={() => {addRating(index + 1)}} className="fa-solid fa-star result__options--item-star" key={index}></i>
            ) : (
                <i onDoubleClick={() => {addRating(index + 0.5)}} onClick={() => {addRating(index + 1)}} className="fa-regular fa-star result__options--item-icon" key={index}></i>
            )
        )
    
    const getStars = 
         [...Array(5)].map((star, index) => 
            index < ratingAmount && index + 1 > ratingAmount ? 
                <i onDoubleClick={() => {addRating(index + 0.5)}} onClick={() => {addRating(index + 1)}} className="fa-solid fa-star-half-stroke result__options--item-star" key={index}></i>
            : index < ratingAmount ? <i onDoubleClick={() => {addRating(index + 0.5)}} onClick={() => {addRating(index + 1)}} className="fa-solid fa-star result__options--item-star" key={index}></i> 
            : <i onDoubleClick={() => {addRating(index + 0.5)}} onClick={() => {addRating(index + 1)}} className="fa-regular fa-star result__options--item-icon" key={index}></i> 
        );
    

    function addWatched(type, id, mediatype){
        console.log(type, id, mediatype);
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'media_id': id,
                'media_type': mediatype,
                'watched': isWatched
            })
        }
        setListoptions(options);
        setAddremove(type);
    }

    function addMovie(type, id, mediatype){
        console.log(type, id, mediatype)
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'media_id': id,
                'media_type': mediatype,
                'favorite': isFavorite
            })
        }
        setOptions(options);
        setAddtype(type);
    }

    function addWatchlist(type, id, mediatype){
        console.log(type, id, mediatype);
        let options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'media_id': id,
                'media_type': mediatype,
                'watchlist': inWatchlist
            })
        }
        setOptions(options);
        setAddtype(type);
    }

    return(
        <div className="result__options">
            <article className="result__options--info">
                <h3 className="result__options--info-title">{moviedata?.title}</h3>
                <p className="result__options--info-year">{moviedata?.release_date.slice(0, 4)}</p>
            </article>
            <ul className="result__options--list">
                <li className="result__options--status">
                    <button onClick={() => {addWatched(isWatched ? 'add_item' : 'remove_item', moviedata?.id, "movie")}} className="result__options--status-button">
                        <i className={`fa-eye result__options--status-icon ${isWatched ? 'fa-regular' : 'fa-solid result__options--status-eye'}`}></i>
                        <p className="result__options--status-text">{!isWatched ? 'Watched' : 'Watch'}</p>
                    </button>
                    <button onClick={() => {addMovie("favorite", moviedata?.id, "movie")}} className="result__options--status-button">
                        <i className={`fa-heart result__options--status-icon ${isFavorite ? 'fa-regular' : 'fa-solid result__options--status-favorite'}`}></i>
                        <p className="result__options--status-text">{isFavorite ? 'Like' : 'Liked'}</p>
                    </button>
                    <button onClick={() => {addWatchlist("watchlist", moviedata?.id, "movie")}} className="result__options--status-button">
                        <i className={`fa-clock result__options--status-icon ${inWatchlist ? 'fa-regular' : 'fa-solid result__options--status-watchlist'}`}></i>
                        <p className="result__options--status-text">Watchlist</p>
                    </button>
                </li>
                <li className="result__options--item">
                    <p className="result__options--item-text">Rated</p>
                    <span className="result__options--item-wrapper">
                        {/* {getStars} */}
                        {/* {ratingAmount === 5 ? '' : getEmptystars} */}
                        {Number.isInteger(ratingAmount)
                            ? stars
                            : getStars
                        }
                    </span>
                </li>
                <li className="result__options--item">
                    Show your activity
                </li>
                <li className="result__options--item">
                    Review or log again
                </li>
                <li className="result__options--item">
                    Add to lists
                </li>
                <li className="result__options--item">
                    Change poster / backdrop
                </li>
                <li className="result__options--item">
                    Share to Instagram Stories
                </li>
                <li className="result__options--item">
                    Share
                </li>
            </ul>
            <button onClick={() => {setDisplayoptions(false)}} className="result__options--exit">
                Done
            </button>
        </div>
    );
}

export default Options;