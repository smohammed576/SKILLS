import { useContext, useEffect, useState } from "react";
import DataContext from "./hooks/context/DataContext";

function Help(){
    const {data} = useContext(DataContext);
    const [helpdata, setHelpdata] = useState([]);
    
    useEffect(() => {
        if(!data || data.length === 0){
            return;
        }
        setHelpdata(data);
    }, [data]);
    
    const dataSets = helpdata?.options?.map((option, index) => 
        <article className="help__options--option" key={index}>
            <i className={option.class}></i>
            <p className="help__options--option-text">{option.title}</p>
            <button className="help__options--option-button">
                <i className="fa-solid fa-chevron-right help__options--option-icon"></i>
            </button>
        </article>
    );
    return(
        <main className="main">
            <section className="help">
                <h2 className="help__title">Help desk</h2>
                <div className="help__wrapper">
                    <figure className="help__figure">
                        <i className="fa-solid fa-headset help__figure--icon"></i>
                        <h3 className="help__figure--text">how can i help you?</h3>
                    </figure>
                    <div className="help__options">
                        {dataSets}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Help;