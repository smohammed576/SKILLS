import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);
    const [name, setName] = useState();

    useEffect(() => {
        (async () => {
            fetch(`https://api.themoviedb.org/3/search/movie?query=${name}&api_key=13631cc9bf997aabaa47ab22c3ee1f67`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
        })();
    }, [name]);

    return(
        <DataContext.Provider value={{data, name, setName}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {DataProvider};