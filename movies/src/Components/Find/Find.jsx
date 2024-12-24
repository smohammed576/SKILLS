import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Find(){
    const {data, name} = useContext(DataContext);
    const [results, setResults] = useState([]);
    const [creditsdata, setCreditsdata] = useState([]);
    const [id, setId] = useState();
    const [directordata, setDirectordata] = useState([]);
    
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
                <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={result.original_title} className="results__image" />
                <a href={`/result/${result.id}`} className="results__link">
                    <h3 className="results__link--title">{result.original_title}</h3> {result.release_date.slice(0, 4)}, directed by someone ig
                </a>
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