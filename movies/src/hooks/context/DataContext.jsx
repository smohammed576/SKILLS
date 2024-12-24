import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [profiledata, setProfiledata] = useState([]);
    const [actordata, setActordata] = useState([]);
    const [moviedata, setMoviedata] = useState([]);
    const [countriesdata, setCountriesdata] = useState([]);
    const [JSONdata, setJSONdata] = useState([]);
    const [name, setName] = useState();
    const [filmsdisplay, setFilmsdisplay] = useState(true);
    const [personid, setPersonid] = useState();
    const [id, setId] = useState();

    useEffect(() => {
        (async () => {
            const [response, profileResponse, movieResponse, countryResponse, JSONResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=details`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7&append_to_response=rated/movies,favorite/movies`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=alternative_titles,keywords,release_dates,credits,recommendations`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/configuration?api_key=13631cc9bf997aabaa47ab22c3ee1f67&append_to_response=countries`).then(response => response.json()),
                fetch("/data.json").then(response => response.json())
            ])
                setData(response);
                setProfiledata(profileResponse);
                setMoviedata(movieResponse);
                setCountriesdata(countryResponse);
                setJSONdata(JSONResponse)
        })();
    }, [name, personid, id]);
    console.log(data)
    return(
        <DataContext.Provider value={{data, profiledata, actordata, setActordata, name, setName, filmsdisplay, setFilmsdisplay, personid, setPersonid, moviedata, id, setId, countriesdata, JSONdata}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {DataProvider};