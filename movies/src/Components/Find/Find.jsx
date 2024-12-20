import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Find(){
    const {data, name} = useContext(DataContext);
    const [results, setResults] = useState([]);
    const [creditsdata, setCreditsdata] = useState([]);
    const [id, setId] = useState(null);
    
    useEffect(() => {
        if(!name || name == null){
            return;
        }
        setResults(data);
    }, [name, data]);

    console.log(id);
    console.log(creditsdata)
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