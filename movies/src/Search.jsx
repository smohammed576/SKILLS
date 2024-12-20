import { useContext, useEffect, useRef } from "react";
import DataContext from "./hooks/context/DataContext";
import Find from "./Components/Find/Find";
import Header from "./Components/Header/Header";

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
        <>
            <Header title="Search"/>
            <main className="main">
                <section className="search">
                    <form onSubmit={(event) => {searchInput(event)}}>
                        <input ref={ref} type="text" className="search__input" />
                        <button className="search__submit" type="submit">
                            <i className="fa-solid fa-magnifying-glass search__submit--icon"></i>
                        </button>
                    </form>
                    <Find/>
                </section>
            </main>
        </>
    );
}

export default Search;