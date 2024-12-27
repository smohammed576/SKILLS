import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Find from "../../Components/Find/Find";
import Header from "../../Components/Header/Header";

function Search(){
    const ref = useRef();
    const {data, name, setName, JSONdata} = useContext(DataContext);
    const [inputfocus, setInputfocus] = useState(false);
    const [activeFilter, setActiveFilter] = useState("Films");
    
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
            {
                inputfocus ?
                ''
                :
                <Header title="Search"/>
            }
            <nav className={`search__navigation ${inputfocus ? 'search__navigation--active' : ''}`}>
                <form className="search__form" onSubmit={(event) => {searchInput(event)}}>
                    <input ref={ref} type="text" className={`search__input ${inputfocus ? 'search__input--active' : ''}`} onFocus={() => {setInputfocus(true)}} />
                    <button className={`search__submit ${inputfocus ? 'search__submit--active' : ''}`} type="submit">
                        <i className="fa-solid fa-magnifying-glass search__submit--icon"></i>
                    </button>
                    {
                        inputfocus ? 
                            <button onClick={() => {setInputfocus(false)}} className="search__cancel">Cancel</button>
                        :
                        ''
                    }
                </form>
                {
                    inputfocus ? 
                        <span className="search__filters">
                            {
                                JSONdata?.filters?.map((filter, index) => {
                                    return(
                                        <button onClick={() => {setActiveFilter(filter.name)}} className={`search__filters--button ${activeFilter === filter.name ? `search__filters--button-active` : ''}`} key={index}>{filter.name}</button>
                                    );
                                }
                                )
                            }
                        </span>
                    :
                     ''
                }
            </nav>
            <main className="main">
                <section className="search">
                    
                    <Find/>
                </section>
            </main>
        </>
    );
}

export default Search;