import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import { useEffect, useState } from "react";

function Movies(){
    const {id} = useParams();
    const [creditsdata, setCreditsdata] = useState([]);

    useEffect(() => {
        (async () => {
            fetch(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`)
            .then((response) => response.json())
            .then((data) => {
                setCreditsdata(data);
            })
        })();
    }, []);

    // const string = creditsdata?.cast?.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

    const movieSets = creditsdata?.cast?.map(movie => 
        <figure className="actor__film" key={movie.id}>
            <a href={`/result/${movie.id}`} className="actor__film--link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="actor__film--link-image" />
            </a>
        </figure>
    );

    return(
        <>
            <Header title="Actor"></Header>
            <main className="main">
                <section className="actor__films">
                    {movieSets}
                </section>
            </main>
        </>
    );

}

export default Movies;