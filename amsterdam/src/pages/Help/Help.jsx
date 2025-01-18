import { useContext, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Help(){
    const {data} = useContext(DataContext);
    const [displayClick, setDisplayClick] = useState();

    const dataSets = data?.help?.map((item, index) => 
        <article onClick={() => {displayClick == index ? setDisplayClick(null) : setDisplayClick(index)}} className="help__question" key={index}>
            {item.question}
            {
                displayClick == index ? 
                    <span className="help__question--answer">{item.answer}</span>
                :
                ''
            }
        </article>
    );

    return(
        <main className="main">
            <section className="help">
                <div className="help__wrapper">
                    <i className="fa-solid fa-headset help__icon"></i>
                    <h3 className="help__title">Helpdesk</h3>
                </div>
                <div className="help__questions">
                    {dataSets}
                </div>
            </section>
        </main>
    );
}

export default Help;