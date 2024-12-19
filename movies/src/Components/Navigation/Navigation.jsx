function Navigation(){
    return(
        <nav className="navigation">
            <a href="/" className="navigation__link">
                <i className="fa-regular fa-copy navigation__link--icon"></i>
            </a>
            <a href="/search" className="navigation__link">
                <i className="fa-solid fa-magnifying-glass navigation__link--icon"></i>
            </a>
            <a href="/profile" className="navigation__link">
                <i className="fa-regular fa-user navigation__link--icon"></i>
            </a>
        </nav>
    );
};

export default Navigation;