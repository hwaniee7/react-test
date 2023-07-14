import React from "react";

import HeaderNav from "./HeaderNav";

const Header:React.FC = () => {

    return (
        <header className="header-container">
            <h1> This is ReactApp </h1>
            <HeaderNav/>
        </header>
    )
}

export default Header;