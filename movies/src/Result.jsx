import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Result(){
    const [resultdata, setResultdata] = useState([]);
    const [creditdata, setCreditdate] = useState([]);
    const [similardata, setSimilardata] = useState([]);
    const [displaylist, setDisplaylist] = useState("Cast");
    const [displaytext, setDisplaytext] = useState(false);
    const [displayoptions, setDisplayoptions] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const ref = useRef()
    useEffect(() => {
        (async () => {
            const [response, creditResponse, similarResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?&api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json())
            ]);
            setResultdata(response);
            setCreditdate(creditResponse);
            setSimilardata(similarResponse)
        })();
    }, []);

    const directed = creditdata?.crew?.find((director) => director.job === "Director") ?? null;

    const castSets = creditdata?.cast?.map(member => 
        <li className="result__cast" key={member.id}>
            <figure className="result__cast--figure">
                <img src={member.profile_path ? `https://image.tmdb.org/t/p/original${member.profile_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={member.name} className="result__cast--figure-image" />
            </figure>
            <div className="result__cast--wrapper">
                <a href={`/actor/${member.id}`} className="result__cast--name">{member.name}</a>
                <p className="result__cast--character">{member.character}</p>
            </div>
        </li>
    );

    const crewSets = creditdata?.crew?.map((member, index) => 
        <li className="result__cast" key={index}>
            <figure className="result__cast--figure">
                <img src={member.profile_path ? `https://image.tmdb.org/t/p/original${member.profile_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={member.name} className="result__cast--figure-image" />
            </figure>
            <div className="result__cast--wrapper">
                <p className="result__cast--name">{member.name}</p>
                <p className="result__cast--character">{member.job}</p>
            </div>
        </li>
    );

    function displayCredits(event){
        setDisplaylist(event.target.innerText);
    }

    function displayClick(){
        setDisplaytext(value => !value);
    }

    const similarSets = similardata?.results?.map(movie => 
        <figure className="result__similar--movie" key={movie.id}>
            <a href={`/result/${movie.id}`} className="result__similar--movie-link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="result__similar--movie-image" />
            </a>
        </figure>
    );

    function showOptions(){
        setDisplayoptions(value => !value);
    }
    return resultdata && creditdata && directed && castSets && crewSets ? (
        <main className="main">
            <section className="result">
                <figure onClick={displayoptions ? showOptions : ''} className="result__figure">
                    <img src={`https://image.tmdb.org/t/p/original${resultdata.backdrop_path}`} alt={`${resultdata.original_title} backdrop image`} className={displayoptions ? 'result__figure--image result__figure--image-options' : 'result__figure--image'} />
                    <span className="result__figure--wrapper">
                        <button onClick={() => {navigate(-1)}} className="result__figure--button">
                            <i className="fa-solid fa-chevron-left result__figure--button-icon"></i>
                        </button>
                        <button onClick={showOptions} className="result__figure--button">
                            <i className="fa-solid fa-ellipsis result__figure--button-icon"></i>
                        </button>
                    </span>
                </figure>
                {
                    displayoptions ? 
                        <div className="result__options">
                            <article className="result__options--info">
                                <h3 className="result__options--info-title">{resultdata.title}</h3>
                                <p className="result__options--info-year">{resultdata.release_date.slice(0, 4)}</p>
                            </article>
                            <ul className="result__options--list">
                                <li className="result__options--status">
                                    <article className="result__options--status-wrapper">
                                        <i className="fa-solid fa-eye result__options--status-icon"></i>
                                        <p className="result__options--status-text">Logged</p>
                                    </article>
                                    <article className="result__options--status-wrapper">
                                        <i className="fa-solid fa-heart result__options--status-icon"></i>
                                        <p className="result__options--status-text">Liked</p>
                                    </article>
                                    <article className="result__options--status-wrapper">
                                        <i className="fa-regular fa-clock result__options--status-icon"></i>
                                        <p className="result__options--status-text">Watchlist</p>
                                    </article>
                                </li>
                                <li className="result__options--item">
                                    <p className="result__options--item-text">Rated</p>
                                    <span className="result__options--item-wrapper">
                                        <i className="fa-regular fa-star result__options--item-star"></i>
                                        <i className="fa-regular fa-star result__options--item-star"></i>
                                        <i className="fa-regular fa-star result__options--item-star"></i>
                                        <i className="fa-regular fa-star result__options--item-star"></i>
                                        <i className="fa-regular fa-star result__options--item-star"></i>
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
                            <button onClick={showOptions} className="result__options--exit">
                                Done
                            </button>
                        </div>
                    :
                    ''
                }
                <div className="result__details">
                    <span className="result__details--span">
                        <div className="result__details--wrapper">
                            <h2 className="result__details--title">{resultdata.original_title}</h2>
                            <article className="result__details--info">
                                <span className="result__details--info-wrapper">
                                    <p className="result__details--info-year">{resultdata.release_date.slice(0, 4)}</p>
                                    <p className="result__details--info-middledot">·</p>
                                    <p className="result__details--info-directed">DIRECTED BY</p>
                                </span>
                                <a href={`/actor/${directed?.id}`} className="result__details--info-director">{directed?.name}</a>
                            </article>
                            <p className="result__details--runtime">{resultdata.runtime} min</p>
                        </div>
                        <figure className="result__details--figure">
                            <img src={`https://image.tmdb.org/t/p/original${resultdata.poster_path}`} alt={`${resultdata.original_title} cover`} className="result__details--figure-image" />
                        </figure>
                    </span>
                    <article onClick={displayClick} className={displaytext ? 'result__details--description' : 'result__details--description result__details--description-limit'}>
                        <h3 className="result__details--description-tagline">{resultdata.tagline}</h3>
                        <p className="result__details--description-text">{resultdata.overview}</p>
                    </article>
                </div>
                <div className="result__rating">
                    <p className="result__rating--title">Rating</p>
                    <h3 className="result__rating--rate">{Math.floor(resultdata.vote_average * 10)}%</h3>
                </div>
                <div className="result__credits">
                    <div className="result__credits--wrapper">
                        <span className="result__credits--buttons">
                            <button onClick={displayCredits} className={displaylist === "Cast" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Cast</button>
                            <button onClick={displayCredits} className={displaylist === "Crew" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Crew</button>
                        </span>
                    </div>
                    <ul className="result__credits--cast">
                        {
                            displaylist === "Cast" ?
                            castSets 
                            : 
                            crewSets
                        }
                    </ul>
                </div>
                <div className="result__similar">
                    <h3 className="result__similar--title">SIMILAR FILMS</h3>
                    <span className="result__similar--wrapper">
                        {similarSets}
                    </span>
                </div>
            </section>
        </main>
    )
    :
    <h2 className="error">cant find it</h2>;
}

export default Result;