import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Find(){
    const {data, name} = useContext(DataContext);
    const [results, setResults] = useState([]);
    const [creditsdata, setCreditsdata] = useState([]);
    const [id, setId] = useState();
    const [directordata, setDirectordata] = useState([]);

    //change this from movie to multi so yk i can search people too pooks hahahhaa sucka mc ugh sorraaay

    useEffect(() => {
        if(!name || name == null){
            return;
        }
        setResults(data);
    }, [name, data]);

    // useEffect(() => {
    //     if(!id){
    //         return;
    //     }
    //     (async () => {
    //         const [response] = await Promise.all([
    //             fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=credits`).then(response => response.json())
    //         ])
    //         console.log(response);
    //         directordata.push(response);
    //     })();
    // }, [id])
    
    const resultSets = results?.results?.map((result, index) => {
        return(
            <article className="results" key={index}>
                {
                    result.media_type === "movie" &&
                        <a href={`/result/${result.id}`} className="results__link">
                            <img src={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : `https://cdn-icons-png.freepik.com/512/83/83545.png`} alt={result.title} className="results__image" />
                            <span className="results__link--wrapper">
                                <h3 className="results__link--title">{result.title}</h3> {result.release_date.slice(0, 4) }, directed by someone ig
                            </span>
                        </a>
                    ||
                    result.media_type === "tv" &&
                        <a href={`/result/${result.id}`} className="results__link">
                            <img src={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : `https://cdn-icons-png.freepik.com/512/83/83545.png`} alt={result.title} className="results__image" />
                            <h3 className="results__link--title">{result.name}</h3> {result.first_air_date.slice(0, 4)}, directed by someone ig
                        </a>
                    ||
                    result.media_type === "person" &&
                        <a href={`/actor/${result.id}`} className="results__link">
                            <img src={result.profile_path ? `https://image.tmdb.org/t/p/original${result.profile_path}` : `https://cdn-icons-png.freepik.com/512/83/83545.png`} alt={result.name} className="results__image" />
                            <div className="results__wrapper">
                                <h3 className="results__name">{result.name}</h3>
                                <p className="results__description">{result.known_for_department === "Acting" && `Actor in ${result.known_for.map(movie => movie.media_type === "movie" ? movie.title : movie.name)}`}</p>
                            </div>
                        </a>
                }
            </article>
        );
    }
    );

    return(
        <div className="search__results">
            {resultSets}
        </div>
    );
}

export default Find;