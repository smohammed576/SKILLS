function Home(){
    return(
        <main className="main">
            <section className="home">
                <article className="home__wrapper">
                    <h2 className="home__title">Welcome</h2>
                </article>
                <div className="home__heading">
                    <img src="https://i0.wp.com/kring.nl/wp-content/uploads/2024/09/Ontwerp-zonder-titel-32.png?fit=1080%2C1080&ssl=1" alt="amsterdam 750 jaar banner" className="home__heading--image" />
                </div>
            </section>
            <section className="highlights">
                <h2 className="highlights__title">Attracties</h2>
                <div className="highlights__wrapper">
                    <figure className="highlights__figure">
                        <img src="https://images.myguide-cdn.com/amsterdam/companies/explore-pass-amsterdam/large/explore-pass-amsterdam-3471424.jpg" alt="amsterdam" className="highlights__figure--image" />
                        <article className="highlights__figure--wrapper">
                            <h3 className="highlights__figure--name">Amsterdam</h3>
                            <button className="highlights__figure--button">
                                <i className="fa-solid fa-arrow-right highlights__figure--button-icon"></i>
                            </button>
                        </article>
                    </figure>
                    <span className="highlights__buttons">
                        <button className="highlights__buttons--button">1</button>
                        <button className="highlights__buttons--button">2</button>
                        <button className="highlights__buttons--button">3</button>
                    </span>
                </div>
            </section>
            <section className="homemap">
                <h2 className="homemap__title">Map</h2>
                <figure className="homemap__figure">
                    <img src="https://www.researchgate.net/publication/308321200/figure/fig6/AS:408233496858625@1474341858196/Amsterdam-The-Netherlands-Google-Maps.png" alt="map amsterdam" className="homemap__figure--image" />
                </figure>
            </section>
            <section className="homehelp">
                <a href="/help" className="homehelp__link">
                    <article className="homehelp__link--help">
                        <h3 className="homehelp__link--help-text">Help is here idk whatever</h3>
                        <i className="fa-solid fa-headset homehelp__link--help-icon"></i>
                    </article>
                </a>
            </section>
        </main>
    );
}

export default Home;