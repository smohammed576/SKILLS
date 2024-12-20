import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function Result(){
    const [resultdata, setResultdata] = useState([]);
    const [creditdata, setCreditdate] = useState([]);
    const [similardata, setSimilardata] = useState([]);
    const [displaylist, setDisplaylist] = useState("Cast");
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

    console.log(resultdata);
    console.log(creditdata);
    console.log(similardata);
    const directed = creditdata?.crew?.find((director) => director.job === "Director") ?? null;

    const castSets = creditdata?.cast?.map(member => 
        <li className="result__cast" key={member.id}>
            <figure className="result__cast--figure">
                <img src={member.profile_path ? `https://image.tmdb.org/t/p/original${member.profile_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={member.name} className="result__cast--figure-image" />
            </figure>
            <div className="result__cast--wrapper">
                <p className="result__cast--name">{member.name}</p>
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

    const similarSets = similardata?.results?.map(movie => 
        <figure className="result__similar--movie" key={movie.id}>
            <a href={`/result/${movie.id}`} className="result__similar--movie-link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="result__similar--movie-image" />
            </a>
        </figure>
    );
    return resultdata && creditdata && directed && castSets && crewSets ? (
        <main className="main">
            <section className="result">
                <figure className="result__figure">
                    <img src={`https://image.tmdb.org/t/p/original${resultdata.backdrop_path}`} alt={`${resultdata.original_title} backdrop image`} className="result__figure--image" />
                </figure>
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
                                <h3 className="result__details--info-director">{directed?.name}</h3>
                            </article>
                            <p className="result__details--runtime">{resultdata.runtime} min</p>
                        </div>
                        <figure className="result__details--figure">
                            <img src={`https://image.tmdb.org/t/p/original${resultdata.poster_path}`} alt={`${resultdata.original_title} cover`} className="result__details--figure-image" />
                        </figure>
                    </span>
                    <article className="result__details--description">
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