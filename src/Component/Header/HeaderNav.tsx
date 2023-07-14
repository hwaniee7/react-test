import React from "react";
import { Nav, NavItem, NavItemProps, NavLink } from "reactstrap";
import { Navbar } from "reactstrap"

const HeaderNav:React.FC = () => {
    return (
        <div className="header-nav-container">
            <Nav>
                <NavItem>
                    <NavLink href="/"> Home </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/account" > 회원목록 </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/files" > 파일관리 </NavLink>
                </NavItem>
            </Nav>
        </div>

    )
}

export default HeaderNav;