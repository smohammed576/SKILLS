import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";
import { useLocation } from "react-router-dom";

function Header(){
    const {data} = useContext(DataContext);
    const [headerdata, setHeaderdata] = useState([]);
    const location = useLocation();
    console.log(location.pathname)
    useEffect(() => {
        if(!data || data.length === 0){
            return;
        }
        setHeaderdata(data);
    }, [data]);
    const dataSets = headerdata?.header?.map(item => {
        if(location.pathname === item.link){
            return(
                <a href={item.link} className="header__navigation--link header__navigation--link-active" key={item.name}>
                    <i className={`${item.class} header__navigation--link-icon`}></i>
                </a>
            );
        }
        else{
            return(
                <a href={item.link} className="header__navigation--link" key={item.name}>
                    <i className={`${item.class} header__navigation--link-icon`}></i>
                </a>
            );
        }
    }
    )
    return(
        <header className="header">
            <nav className="header__navigation">
                {dataSets}
            </nav>
        </header>
    );
}

export default Header;