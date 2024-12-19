import { useContext, useEffect, useRef } from "react";
import DataContext from "./hooks/context/DataContext";
import Find from "./Components/Find/Find";

function Search(){
    const ref = useRef();
    const {data, name, setName} = useContext(DataContext);
    
    useEffect(() => {
        if(!data || data.length === 0){
            return;
        }
    }, [data, name]);
    const searchInput = (event) => {
        event.preventDefault();
        setName(ref.current.value);
    }
    return(
        <section className="search">
            <form onSubmit={(event) => {searchInput(event)}}>
                <input ref={ref} type="text" className="search__input" />
                <input type="submit" className="search__submit" />
            </form>
            <Find/>
        </section>
    );
}

export default Search;