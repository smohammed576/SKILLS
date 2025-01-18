import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({children}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async () => {
            fetch("/data.json")
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
        })();
    }, []);
    return(
        <DataContext.Provider value={{data}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;

export {DataProvider};