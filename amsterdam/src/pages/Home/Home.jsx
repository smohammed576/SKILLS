import { useContext, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function Home(){
    const {data} = useContext(DataContext);
    const [index, setIndex] = useState(11);

    return data.length !== 0 ? (
        <main className="main">
            <section className="home">
                <header className="home__header">
                    <img src="https://amsterdam750.nl/wp-content/uploads/2024/03/Share-image.png" alt="amsterdam slinger" className="home__header--image" />
                </header>
                <div className="home__highlights">
                    <a href={`/attractions/${index}`} className="home__highlight" key={index}>
                        <img src={data?.attractions[index]?.image} alt={data?.attractions[index]?.name} className="home__highlight--image" />
                        <article className="home__highlight--info">
                            <h3 className="home__highlight--info-name">{data?.attractions[index]?.name}</h3>
                            <p className="home__highlight--info-overview">{data?.attractions[index]?.overview?.substring(0, 100)}...</p>
                        </article>
                    </a>
                    <span className="home__highlights--buttons">
                        <i onClick={() => {setIndex(11)}} className={`${index == 11 ? 'fa-solid' : 'fa-regular'} fa-circle home__hightlights--buttons-button`}></i>
                        <i onClick={() => {setIndex(4)}} className={`${index == 4 ? 'fa-solid' : 'fa-regular'} fa-circle home__hightlights--buttons-button`}></i>
                    </span>
                </div>
                <div className="home__map">
                    <h3 className="home__map--title">Explore</h3>
                    <a href="/map" className="home__map--link">
                        <i className="fa-solid fa-location-dot home__map--link-icon"></i>
                        <article className="home__map--link-wrapper">
                            <h3 className="home__map--link-title">Places to see</h3>
                            <p className="home__map--link-text">20 places in Amsterdam ufehowi</p>
                        </article>
                    </a>
                </div>
                <div className="home__help">
                    <h3 className="home__help--title">Any questions?</h3>
                    <a href="/help" className="home__help--link">
                        <i className="fa-solid fa-headset home__help--link-icon"></i>
                        <article className="home__help--link-wrapper">
                            <h3 className="home__help--link-title">Helpdesk</h3>
                            <p className="home__help--link-text">ugh almost finished parks and rec again:c</p>
                        </article>
                    </a>
                </div>
            </section>
        </main>
    )
    :
    ''
}

export default Home;