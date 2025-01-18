import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [profiledata, setProfiledata] = useState([]);
    const [actordata, setActordata] = useState([]);
    const [moviedata, setMoviedata] = useState([]);
    const [countriesdata, setCountriesdata] = useState([]);
    const [genredata, setGenredata] = useState([]);
    const [genrelist, setGenrelist] = useState([]);
    const [adddata, setAdddata] = useState([]);
    const [JSONdata, setJSONdata] = useState([]);
    const [watcheddata, setWatcheddata] = useState([]);
    const [name, setName] = useState();
    const [addtype, setAddtype] = useState();
    const [filmsdisplay, setFilmsdisplay] = useState(true);
    const [genreid, setGenreid] = useState();
    const [personid, setPersonid] = useState();
    const [id, setId] = useState();
    const [displayoptions, setDisplayoptions] = useState(false);
    const [options, setOptions] = useState();
    const [watchid, setWatchid] = useState();
    const [listoptions, setListoptions] = useState();
    const [addremove, setAddremove] = useState();
    const [ratingoptions, setRatingoptions] = useState();
    // const [votingdata, setVotingdata] = useState([]);
    // const [config, setConfig] = useState();

    useEffect(() => {
        (async () => {
            const [response, profileResponse, movieResponse, countryResponse, genreResponse, genresResponse, addResponse, JSONResponse, watchedResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/search/multi?query=${name}&api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=details`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7&append_to_response=rated/movies,favorite/movies,watchlist/movies,lists`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7&append_to_response=alternative_titles,keywords,release_dates,credits,recommendations,videos,account_states,lists,watch/providers,reviews,changes`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/configuration?api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=countries`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/discover/movie?api_key=13631cc9bf997aabaa47ab22c3ee1f67&sort_by=vote_count.desc&${genreid}`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/21023225/${addtype}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`, options).then(response => response.json()),
                fetch("/data.json").then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/list/8503521/item_status?api_key=13631cc9bf997aabaa47ab22c3ee1f67&movie_id=${id}`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/list/8503521/${addremove}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`, listoptions).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`, ratingoptions).then(response => response.json()),
            ])
                setData(response);
                setProfiledata(profileResponse);
                setMoviedata(movieResponse);
                setCountriesdata(countryResponse);
                setGenredata(genreResponse);
                setGenrelist(genresResponse);
                setAdddata(addResponse);
                setJSONdata(JSONResponse);
                setWatcheddata(watchedResponse);
                // setVotingdata(votingResponse);
        })();
    }, [name, personid, genreid, id, addtype, options, watchid, listoptions, addremove, ratingoptions]);

    console.log(listoptions)
    console.log(profiledata)
    // console.log(votingdata)

    return(
        <DataContext.Provider value={{data, profiledata, actordata, setActordata, name, setName, filmsdisplay, setFilmsdisplay, personid, setPersonid, moviedata, id, setId, countriesdata, JSONdata, adddata, setAdddata, displayoptions, setDisplayoptions, setGenreid, genreid, genredata, genrelist, addtype, setAddtype, setOptions, setWatchid, watcheddata, setListoptions, setAddremove, setRatingoptions}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {DataProvider};