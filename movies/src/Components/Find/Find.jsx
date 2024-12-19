import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Find(){
    const {data, name} = useContext(DataContext);
    const [results, setResults] = useState([]);
    
    useEffect(() => {
        if(!name || name == null){
            return;
        }
        setResults(data);
    }, [name, data]);

    const resultSets = results?.results?.map((result, index) => 
        <article className="result" key={index}>
            <img src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt="" className="result__image" />
            <a href={`/result/${result.id}`} className="result__link">{result.original_title}</a>
        </article>
    );

    return(
        <>
            {resultSets}
        </>
    );
}

export default Find;