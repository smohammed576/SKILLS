import { useState } from "react";
import { useParams } from "react-router-dom";

function Result(){
    const [resultdata, setResultdata] = useState([]);
    const {id} = useParams();
    console.log(id);
    (async () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=13631cc9bf997aabaa47ab22c3ee1f67`)
        .then((response) => response.json())
        .then((data) => {
            setResultdata(data);
            console.log(resultdata)
        })
    })
    console.log(resultdata)
    return(
        <>
            result
        </>
    );
}

export default Result;