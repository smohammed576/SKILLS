import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../../hooks/context/DataContext";
import Header from "../Header/Header";

function Genre(){
    const {list,id} = useParams();
    const {setGenreid, genredata, genrelist} = useContext(DataContext);
    const navigate = useNavigate();
    console.log(list)
    useEffect(() => {
        if(!list || !id){
            return;
        }
        setGenreid(`with_${list}=${id}`);
    }, [list, id]);
    
    const getGenre = genrelist?.genres?.find((genre) => genre.id == id) ?? null;
    console.log(getGenre)
    console.log(genredata);
    const genresets = genredata?.results?.map(movie => 
        <figure className="actor__film" key={movie.id}>
            <a href={`/result/${movie.id}`} className="actor__film--link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="actor__film--link-image" />
            </a>
        </figure>
    );

    return(
        <>
            <Header title={getGenre?.name}>
                {/* <button onClick={() => {navigate(-1)}} className="header__return">
                    <i className="fa-solid fa-chevron-left header__return--icon"></i>
                </button> */}
            </Header>
            <section className="actor__films">
                {genresets}
            </section>
        </>
    );
}

export {Genre};