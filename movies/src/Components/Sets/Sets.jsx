import { useContext, useEffect, useState } from "react";
import DataContext from "../../hooks/context/DataContext";

function DetailsSets(){
    const {moviedata, id} = useContext(DataContext);
    console.log(moviedata)
    console.log(id)
    return(
        <>
            <span className="result__item--title">
                Studios
            </span>
            {
                moviedata?.production_companies?.map(company =>
                    <article className="result__item" key={company.id}>
                        {company.name}
                    </article>
                )
            }
            <span className="result__item--title">
                Country
            </span>
            {
                moviedata?.production_countries?.map(country =>
                    <article className="result__item" key={country.iso_3166_1}>
                        {country.name}
                    </article>
                )
            }
            <span className="result__item--title">
                Language
            </span>
            {
                moviedata?.spoken_languages?.map(language => 
                    <article className="result__item" key={language.iso_639_1}>
                        {language.name}
                    </article>
                )
            }
            <span className="result__item--title">
                Alternative titles
            </span>
            {
                moviedata?.alternative_titles?.titles?.map((title, index) => 
                    <article className="result__item" key={index}>
                        {title.title}
                    </article>
                )
            }
        </>
    );
}

function GenreSets(){
    const {moviedata} = useContext(DataContext);
    console.log(moviedata?.keywords)
    return(
        <>
            <span className="result__item--title">
                Genre
            </span>
            {
                moviedata?.genres?.map(genre => 
                    <article className="result__item" key={genre.id}>
                        <a href={`/films/genres/${genre.id}`} className="result__item--link">
                            <p className="result__item--link-text">{genre.name}</p>
                            <i className="fa-solid fa-chevron-right result__item--link-icon"></i>
                        </a>
                    </article>
                )
            }
            <span className="result__item--title">
                Keywords
            </span>
            {
                moviedata?.keywords?.keywords?.map(keyword => 
                    <article className="result__item" key={keyword.id}>
                        <a href={`/films/keywords/${keyword.id}`} className="result__item--link">
                            <p className="result__item--link-text">{keyword.name}</p>
                            <i className="fa-solid fa-chevron-right result__item--link-icon"></i>
                        </a>
                    </article>
                )
            }
        </>
    );
}

function ReleaseSets(){
    const {moviedata, countriesdata, JSONdata} = useContext(DataContext);
    const [sortdata, setSortdata] = useState([]);
    let currenttype = null;

    useEffect(() => {
        if(moviedata?.release_dates?.results){
            const allDates = moviedata.release_dates.results.map(item => {
                return item.release_dates.map(date => ({
                    ...date,
                    iso_3166_1: item.iso_3166_1
                }));
            })
            .reduce((a, b) => a.concat(b), []);
            console.log(allDates);

            const sorting = allDates.sort((a, b) => a.type - b.type);

            setSortdata(sorting);
        }
    }, [moviedata]);

    return(
        <>
            {
                sortdata?.map((data, index) => {
                    const newType = data.type !== currenttype;
                    currenttype = data.type;
                    return(
                        <>
                            {
                                newType ? 
                                <span className="result__item--title" key={index*9347}>{JSONdata?.releasetypes[data.type - 1]}</span>
                                :
                                ''
                            }
                            <article className="result__release" key={index}>
                                <p className="result__release--text">{new Date(data.release_date).toLocaleDateString('en-UK', {day: 'numeric', month: 'short', year: 'numeric'})}</p> 
                                <span className="result__release--country">
                                    <img src={`https://countryflagsapi.netlify.app/flag/${data.iso_3166_1}.svg`} alt={`${data.iso_3166_1} flag`} className="result__release--country-image" />
                                    <p className="result__release--country-name">{data.iso_3166_1 === "US" && "USA" || data.iso_3166_1 === "CZ" && "Czechia" || data.iso_3166_1 === "GB" && "UK" ||  countriesdata?.countries?.find((country) => country.iso_3166_1 === data.iso_3166_1).english_name}</p>
                                    {data.certification ? <article className="result__release--country-certification">{data.certification}</article> : ''}
                                </span>
                            </article>
                        </>
                    );
                }
                )
            }
        </>
    );
}

export {DetailsSets};

export {GenreSets};

export {ReleaseSets};