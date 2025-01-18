import { useContext, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Carousel(){
    const {data} = useContext(DataContext);
    const [index, setIndex] = useState(0);
    
    return(
        <div className="carousel">
            <img onClick={() => {setIndex(index + 1)}} src={data?.attractions[index]?.image} alt={data?.attractions[index]?.name} className="carousel__image" />
            <article className="carousel__info">
                <h2 className="carousel__info--name">{data?.attractions[index]?.name}</h2>
                <span className="carousel__info--address"><i className="fa-solid fa-map-pin carousel__info--address-icon"></i>{data?.attractions[index]?.address}</span>
                <p className="carousel__info--overview">{data?.attractions[index]?.overview.substring(0, 120)}...</p>
                <a href={`/attractions/${data?.attractions[index]?.id}`} className="carousel__info--button">View</a>
            </article>
        </div>
    );
}

export default Carousel;