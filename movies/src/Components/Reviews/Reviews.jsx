//rating heart REWATCHED OTHER SIDE SO SPACE BETWEEN username and profile picture under that review title reviews of girl interrupted

import { useContext, useEffect } from "react";
import DataContext from "../../hooks/context/DataContext";
import Header from "../Header/Header";
import { useParams } from "react-router-dom";

function Reviews(){
    const {moviedata, setId} = useContext(DataContext);
    const {id} = useParams();
    console.log(id);

    useEffect(() => {
        if(!id){
            return;
        }
        setId(id);
    }, []);

    console.log(moviedata);

    const reviewSets = moviedata?.reviews?.results?.map(review => 
        <article className="review" key={review.id}>
            <span className="review__header">
                <div className="review__header--rating">
                    {
                        Array.from({length: review.author_details?.rating / 2}, (_,index) =>
                            <i className="fa-solid fa-star review__header--rating-star" key={index}></i>
                        )
                    }
                    {Number.isInteger(review.author_details?.rating / 2) ? '' : '1/2'}
                </div>
                <div className="review__header--user">
                    <p className="review__header--user-name">{review.author}</p>
                    {
                        review.author_details?.avatar_path ? 
                            <img src={`https://image.tmdb.org/t/p/original${review.author_details?.avatar_path}`} alt={review.author} className="review__header--user-image" />
                        :
                            ''
                    }
                </div>
            </span>
            <p className="review__text">{review.content}</p>
        </article>
    );

    return(
        <>
            <Header title={`Reviews of ${moviedata?.title}`}></Header>
            <main className="main">
                <section className="reviews">
                    {reviewSets}
                </section>
            </main>
        </>
    );
}

export default Reviews;