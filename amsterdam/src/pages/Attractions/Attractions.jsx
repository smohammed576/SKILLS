import { useContext, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import Carousel from "../../Components/Carousel/Carousel";
import List from "../../Components/List/List";

function Attractions(){
    const {data} = useContext(DataContext);
    const [displayClick, setDisplayClick] = useState("grid");

    const dataSets = data?.attractions?.map(attraction => 
        <a href={`/attractions/${attraction.id}`} className="attractions__grid--item" key={attraction.id}>
            <img src={attraction.image} alt={attraction.name} className="attractions__grid--item-image" />
            <article className="attractions__grid--item-info">
                <h3 className="attractions__grid--item-infoName">{attraction.name}</h3>
                <p className="attractions__grid--item-infoText">{attraction.overview.substring(0, 20)}...</p>
            </article>
        </a>
    );

    return(
        <main className="main">
            <section className="attractions">
                <span className="attractions__buttons">
                    <button onClick={() => {setDisplayClick("grid")}} className={`attractions__buttons--button ${displayClick === "grid" ? 'attractions__buttons--button-active' : ''}`}>
                        <i className="fa-solid fa-border-all attractions__buttons--button-icon"></i>
                         Grid
                    </button>
                    <button onClick={() => {setDisplayClick("carousel")}} className={`attractions__buttons--button ${displayClick === "carousel" ? 'attractions__buttons--button-active' : ''}`}>
                        <i className="fa-regular fa-hand-spock"></i>
                         Carousel
                    </button>
                    <button onClick={() => {setDisplayClick("list")}} className={`attractions__buttons--button ${displayClick === "list" ? 'attractions__buttons--button-active' : ''}`}>
                        <i className="fa-solid fa-bars attractions__buttons--button-icon"></i>
                         List
                    </button>
                </span>
                {
                    displayClick === "carousel" &&
                        <Carousel/>
                    ||
                    displayClick === "grid" &&
                        <div className="attractions__grid">
                            {dataSets}
                        </div>
                    ||
                    displayClick ===  "list" &&
                        <List/>
                }
            </section>
        </main>
    );
}

export default Attractions;