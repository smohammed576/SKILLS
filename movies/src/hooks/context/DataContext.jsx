import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [profiledata, setProfiledata] = useState([]);
    const [filmsdata, setFilmsdata] = useState([]);
    const [favoritedata, setFavoritedata] = useState([]);
    const [actordata, setActordata] = useState([]);
    const [name, setName] = useState();
    const [filmsdisplay, setFilmsdisplay] = useState(true);
    const [personid, setPersonid] = useState();

    useEffect(() => {
        (async () => {
            const [response, profileResponse, filmsResponse, favoriteResponse, personResponse] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=13631cc9bf997aabaa47ab22c3ee1f67`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/rated/movies?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json()),
                fetch(`https://api.themoviedb.org/3/account/%7Baccount_id%7D/favorite/movies?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json()),
                // fetch(`https://api.themoviedb.org/3/person/${personid}?api_key=13631cc9bf997aabaa47ab22c3ee1f67&session_id=35e07d41174e5b9b3abdc25c4eb6ba839bba81f7`).then(response => response.json())
            ])
                setData(response);
                setProfiledata(profileResponse);
                setFilmsdata(filmsResponse);
                setFavoritedata(favoriteResponse);
                // setActordata(personResponse);
        })();
    }, [name, personid]);

    return(
        <DataContext.Provider value={{data, profiledata, setProfiledata, filmsdata, setFilmsdata, favoritedata, setFavoritedata, actordata, setActordata, name, setName, filmsdisplay, setFilmsdisplay, personid, setPersonid}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {DataProvider};