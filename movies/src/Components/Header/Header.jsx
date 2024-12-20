function Header(props){
    return(
        <header className="header">
            <h2 className="header__title">
                {props.title}
            </h2>
        </header>
    );
}

export default Header;