import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailsSets, GenreSets, ReleaseSets } from "../../Components/Sets/Sets";
import DataContext from "../../hooks/context/DataContext";
import Options from "../../Components/Options/Options";

function Result(){
    const [displaylist, setDisplaylist] = useState("Cast");
    const [displaytext, setDisplaytext] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();
    const {moviedata, setId, displayoptions, setDisplayoptions} = useContext(DataContext);
    console.log(moviedata)
    useEffect(() => {
        if(!id || !moviedata){
            return;
        }
        setId(id);
    }, [id]);

    const directed = moviedata?.credits?.crew?.find((director) => director.job === "Director") ?? null;

    const castSets = moviedata?.credits?.cast?.map(member => 
        <article className="result__cast" key={member.id}>
            <figure className="result__cast--figure">
                <img src={member.profile_path ? `https://image.tmdb.org/t/p/original${member.profile_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={member.name} className="result__cast--figure-image" />
            </figure>
            <div className="result__cast--wrapper">
                <a href={`/actor/${member.id}`} className="result__cast--name">{member.name}</a>
                <p className="result__cast--character">{member.character}</p>
            </div>
        </article>
    );

    const crewSets = moviedata?.credits?.crew?.map((member, index) => 
        <article className="result__cast" key={index}>
            <figure className="result__cast--figure">
                <img src={member.profile_path ? `https://image.tmdb.org/t/p/original${member.profile_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={member.name} className="result__cast--figure-image" />
            </figure>
            <div className="result__cast--wrapper">
                <a href={`/actor/${member.id}`} className="result__cast--name">{member.name}</a>
                <p className="result__cast--character">{member.job}</p>
            </div>
        </article>
    );

    function displayCredits(event){
        setDisplaylist(event.target.innerText);
        setId(id);
    }

    function displayClick(){
        setDisplaytext(value => !value);
    }

    const similarSets = moviedata?.recommendations?.results?.map(movie => 
        <figure className="result__similar--movie" key={movie.id}>
            <a href={`/result/${movie.id}`} className="result__similar--movie-link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="result__similar--movie-image" />
            </a>
        </figure>
    );
    
    console.log(moviedata?.videos)

    function showOptions(){
        setDisplayoptions(value => !value);
    }
    return moviedata && directed && castSets && crewSets ? (
        <main className="main">
            <section className="result">
                <figure onClick={displayoptions ? showOptions : null} className="result__figure">
                    <img src={`https://image.tmdb.org/t/p/original${moviedata?.backdrop_path}`} alt={`${moviedata?.original_title} backdrop image`} className={displayoptions ? 'result__figure--image result__figure--image-options' : 'result__figure--image'} />
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
                        <Options/>
                    :
                        ''
                }
                <div className="result__details">
                    <span className="result__details--span">
                        <div className="result__details--wrapper">
                            <h2 className="result__details--title">{moviedata?.original_title}</h2>
                            <article className="result__details--info">
                                <span className="result__details--info-wrapper">
                                    <p className="result__details--info-year">{moviedata?.release_date.slice(0, 4)}</p>
                                    <p className="result__details--info-middledot">·</p>
                                    <p className="result__details--info-directed">DIRECTED BY</p>
                                </span>
                                <a href={`/actor/${directed?.id}`} className="result__details--info-director">{directed?.name}</a>
                            </article>
                            <span className="result__details--video">
                                <button className="result__details--video-trailer">
                                    <a href={`https://www.youtube.com/watch?v=${moviedata?.videos?.results[0]?.key}`} className="result__details--video-link" target="_BLANK">
                                    <i className="fa-solid fa-play result__details--video-icon"></i>
                                    TRAILER</a>
                                </button>
                                <p className="result__details--video-runtime">{moviedata?.runtime} min</p>
                            </span>
                        </div>
                        <figure className="result__details--figure">
                            <img src={`https://image.tmdb.org/t/p/original${moviedata?.poster_path}`} alt={`${moviedata?.original_title} cover`} className="result__details--figure-image" />
                        </figure>
                    </span>
                    <article onClick={displayClick} className={displaytext ? 'result__details--description' : 'result__details--description result__details--description-limit'}>
                        <h3 className="result__details--description-tagline">{moviedata?.tagline}</h3>
                        <p className="result__details--description-text">{moviedata?.overview}</p>
                    </article>
                </div>
                <div className="result__rating">
                    <p className="result__rating--title">Rating</p>
                    <h3 className="result__rating--rate">{Math.floor(moviedata?.vote_average * 10)}%</h3>
                </div>
                <div className="result__credits">
                    <div className="result__credits--wrapper">
                        <span className="result__credits--buttons">
                            <button onClick={displayCredits} className={displaylist === "Cast" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Cast</button>
                            <button onClick={displayCredits} className={displaylist === "Crew" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Crew</button>
                            <button onClick={displayCredits} className={displaylist === "Details" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Details</button>
                            <button onClick={displayCredits} className={displaylist === "Genres" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Genres</button>
                            <button onClick={displayCredits} className={displaylist === "Releases" ? "result__credits--buttons-active result__credits--buttons-button" : "result__credits--buttons-button"}>Releases</button>
                        </span>
                    </div>
                    <div className="result__credits--cast">
                        {
                            displaylist === "Cast" && castSets 
                            || 
                            displaylist === "Crew" && crewSets
                            ||
                            displaylist === "Details" && <DetailsSets/>
                            ||
                            displaylist === "Genres" && <GenreSets/>
                            ||
                            displaylist === "Releases" && <ReleaseSets/>
                        }
                    </div>
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