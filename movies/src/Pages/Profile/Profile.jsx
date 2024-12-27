import { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import DataContext from "../../hooks/context/DataContext";
import { Dairy, Lists, Profileset, Watchlist } from "../../Components/Profilesets/Profilesets";

function Profile(){
    const {profiledata} = useContext(DataContext);
    const [displayscreen, setDisplayscreen] = useState("Profile");

    return(
        <>
            <Header title={profiledata.name}>
                <span className="header__wrapper">
                    <button onClick={() => {setDisplayscreen("Profile")}} className={`header__button ${displayscreen === "Profile" ? 'header__button--active' : ''}`}>Profile</button>
                    <button onClick={() => {setDisplayscreen("Dairy")}} className={`header__button ${displayscreen === "Dairy" ? 'header__button--active' : ''}`}>Dairy</button>
                    <button onClick={() => {setDisplayscreen("Lists")}} className={`header__button ${displayscreen === "Lists" ? 'header__button--active' : ''}`}>Lists</button>
                    <button onClick={() => {setDisplayscreen("Watchlist")}} className={`header__button ${displayscreen === "Watchlist" ? 'header__button--active' : ''}`}>Watchlist</button>
                </span>
            </Header>
            <main className="main">
                {
                    displayscreen === "Profile" &&
                        <Profileset/>
                    ||
                    displayscreen === "Dairy" &&
                        <Dairy/>
                    ||
                    displayscreen === "Lists" &&
                        <Lists/>
                    ||
                    displayscreen === "Watchlist" &&
                        <Watchlist/>
                }
            </main>
        </>
    );
}

export default Profile;