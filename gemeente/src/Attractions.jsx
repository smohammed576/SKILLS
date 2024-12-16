import { useContext, useEffect, useState } from "react";
import DataContext from "./hooks/context/DataContext";

function Attractions(){
    const {data} = useContext(DataContext);
    const [attractionsdata, setAttractionsdata] = useState(null);

    useEffect(() => {
        if(!data || data.length === 0){
            return;
        }
        setAttractionsdata(data);
    }, [data]);
    console.log(attractionsdata);

    const dataSets = attractionsdata?.attractions?.map(attraction => 
        <article className="attraction" key={attraction.id}>
            <img src={attraction.image} alt={attraction.name} className="attraction__image" />
            <div className="attraction__wrapper">
                <h3 className="attraction__name">{attraction.name}</h3>
                <p className="attraction__location">
                    <i className="fa-solid fa-location-dot attraction__location--icon"></i>
                    {attraction.location}
                </p>
            </div>
        </article>
    );
    return(
        <main className="main">
            <section className="attractions">
                <h2 className="attractions__title">Attractions</h2>
                <div className="attractions__list">
                    {dataSets}
                </div>
            </section>
        </main>
    );
}

export default Attractions;