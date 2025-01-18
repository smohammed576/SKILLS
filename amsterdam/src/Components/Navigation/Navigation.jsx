import { useContext } from "react";
import DataContext from "../../hooks/context/DataContext";

function Navigation(){
    const {data} = useContext(DataContext);
    
    const dataSets = data?.navigation?.map((item, index) => 
        <a href={item.path} className="navigation__item" key={index}>
            <i className={item.class}></i>
        </a>
    );
    return(
        <nav className="navigation">
            {dataSets}
        </nav>
    );
}

export default Navigation;