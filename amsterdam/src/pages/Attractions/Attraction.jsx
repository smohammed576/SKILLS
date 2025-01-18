import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../hooks/context/DataContext";

function Attraction(){
    const {data} = useContext(DataContext);
    const [attractiondata, setAttractiondata] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        if(!data || data.length === 0){
            return;
        }
        setAttractiondata(data?.attractions?.find((item) => item.id == id) ?? null);
    }, [data, id]);

    return(
        <main className="main">
            <section className="attraction">
                <img src={attractiondata?.image} alt={attractiondata?.name} className="attraction__image" />
                <div className="attraction__info">
                    <h2 className="attraction__info--name">{attractiondata?.name}</h2>
                    <span className="attraction__info--address">
                        <i className="fa-solid fa-map-pin attraction__info--address-icon"></i>
                        {attractiondata?.address}
                    </span>
                    <article className="attraction__info--overview">
                        {attractiondata?.overview}
                    </article>
                </div>
            </section>
        </main>
    );
}

export default Attraction;