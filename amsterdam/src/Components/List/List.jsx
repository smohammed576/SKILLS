import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

function List(){
    const {data} = useContext(DataContext);

    const dataSets = data?.attractions?.map(item => 
        <li className="attractions__item" key={item.id}>
            <img src={item.image} alt={item.name} className="attractions__item--image" />
            <article className="attractions__item--wrapper">
                <h3 className="attractions__item--name">{item.name}</h3>
                <p className="attractions__item--location">{item.address}</p>
            </article>
        </li>
    );

    return(
        <ul className="attractions__list">
            {dataSets}
        </ul>
    );
}

export default List;