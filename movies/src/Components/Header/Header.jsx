function Header({title, children}){
    return(
        <header className="header">
            <h2 className="header__title">
                {title}
            </h2>
            {children}
        </header>
    );
}

export default Header;