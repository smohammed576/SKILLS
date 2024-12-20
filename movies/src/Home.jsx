import { useEffect, useState } from "react";

function Home(){
    const [nowplaying, setNowplaying] = useState([]);
    const [top, setTop] = useState([]);
    const [popular, setPopular] = useState([]);

    const array = [nowplaying, top, popular];
    const names = ["Now playing", "Top rated", "Popular"];

    useEffect(() => {
        (async () => {
            const [nowResponse, topResponse, popularResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=2024-10-06&release_date.lte=2025-03-10&api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json())
            ]);
            setNowplaying(nowResponse);
            setTop(topResponse);
            setPopular(popularResponse);
        })();
    }, []);

    const dataSets = array?.map((value, index) => {
        const sets = value?.results?.map(movie => 
            <figure className="result__similar--movie" key={movie.id}>
                <a href={`result/${movie.id}`} className="result__similar--movie-link">
                    <img src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : 'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg'} alt={movie.title} className="result__similar--movie-image" />
                </a>
            </figure>
        );
        return(
            <div className="result__similar" key={index}>
                <h3 className="result__similar--title">{names[index]}</h3>
                <span className="result__similar--wrapper">
                    {sets}
                </span>
            </div>
        );
    }
    );

    return(
        <>
        {dataSets}
        </>
    );
}

export default Home;