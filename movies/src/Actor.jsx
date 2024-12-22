import { useParams } from "react-router-dom";
import Header from "./Components/Header/Header";
import { useContext, useEffect, useState } from "react";
import DataContext from "./hooks/context/DataContext";

function Actor(){
    const [actordata, setActordata] = useState([]);
    const [creditsdata, setCreditdata] = useState([]);
    const [watcheddata, setWatcheddata] = useState([]);
    const [displayText, setDisplayText] = useState(false);
    const [activitydisplay, setActivitydisplay] = useState(false);
    const [activity, setActivity] = useState();
    const [getUnique, setGetUnique] = useState([]);
    const {id} = useParams();
    const {filmsdata} = useContext(DataContext);
    useEffect(() => {
        (async () => {
            const [response, creditsResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/person/${id}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json())
            ])
            setActordata(response);
            setCreditdata(creditsResponse);
        })();
    }, []);

    useEffect(() => {
        if(filmsdata?.results){
            setWatcheddata(filmsdata?.results?.map(movie => movie.id));
        }
    }, [filmsdata]);
    console.log(creditsdata)
    console.log(actordata);
    function displayclick(){
        setDisplayText(value => !value);
    }

    const movieSets = creditsdata?.cast?.slice(0, 8).map(movie => 
        <a href={`/result/${movie.id}`} className="actor__movie" key={movie.id}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="actor__movie--image" />
        </a>
    );

    useEffect(() => {
        if(!creditsdata || watcheddata?.length === 0){
            return;
        }
        const watched = creditsdata?.cast?.filter(movie => watcheddata?.includes(movie.id));
        setActivity(watched?.length);
    }, [watcheddata, creditsdata]);

    function watchActivity(){
        setActivitydisplay(value => !value);
    }


    creditsdata?.crew?.map((jobs) => {
        const findJob = getUnique.find((item) => item.job === jobs.job);
        if(!findJob){
            getUnique.push(jobs);
        }
    })
    const getDepartments = getUnique?.map(item => item.job);

    const jobSets = getDepartments?.map((value, index) => {
        const getArrays = creditsdata?.crew?.filter(work => work.job === value);
        console.log(getArrays)
        const watched = getArrays?.filter(movie => watcheddata?.includes(movie.id));
        return(
            <article className="actor__movies" key={index}>
                <span className="actor__amount">
                    <p className="actor__amount--text">{value} of {value.length} movies</p>
                    <button onClick={watchActivity} className="actor__amount--seen">
                        <i className="fa-solid fa-eye actor__amount--seen-icon"></i>
                        <p className="actor__amount--seen-text">{activitydisplay ? `${watched.length} of ${getDepartments[index]?.length}` : `${Math.floor(watched.length / getDepartments?.length * 100)}%`}</p>
                    </button>
                </span>
                <div className="actor__movies--wrapper">
                    {
                        getArrays?.slice(0, 8).map(movie => {
                            return(
                                <a href={`/result/${movie.id}`} className="actor__movie">
                                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="actor__movie--image" />
                                </a>
                            );
                        }
                        )
                    }
                </div>
            </article>
        )
    })
    return(
        <>
            <Header title={actordata.name}/>
            <section className="actor">
                <div className="actor__info">
                    <figure className="actor__info--figure">
                        <img src={`https://image.tmdb.org/t/p/original${actordata.profile_path}`} alt={actordata.name} className="actor__info--figure-image" />
                    </figure>
                    <article onClick={displayclick} className={displayText ? 'actor__info--biography' : 'actor__info--biography actor__info--biography-limit'}>
                        <p className="actor__info--biography-text">
                            {actordata.biography}
                        </p>
                    </article>
                </div>
                <div className="actor__movies">
                    <span className="actor__amount">
                        <p className="actor__amount--text">ACTOR IN {creditsdata.cast?.length} FILMS</p>
                        <button onClick={watchActivity} className="actor__amount--seen">
                            <i className="fa-solid fa-eye actor__amount--seen-icon"></i>
                            <p className="actor__amount--seen-text">{activitydisplay ? `${activity} of ${creditsdata.cast?.length}` : `${Math.floor(activity / creditsdata.cast?.length * 100)}%`}</p>
                        </button>
                    </span>
                    <div className="actor__movies--wrapper">
                        {movieSets}
                    </div>
                    <span className="actor__movies--more">
                        <a href={`/actor/${id}/movies`} className="actor__movies--more-link">All films as Actor <i className="fa-solid fa-chevron-right actor__movies--more-icon"></i></a>
                    </span>
                </div>
                {creditsdata?.crew?.length > 0 ? 
                    <>
                        {
                            jobSets?.map(element => 
                                <>
                                    {element}
                                </>
                            )
                        }
                    </>
                : ''}
            </section>
        </>
    );
}

export default Actor;