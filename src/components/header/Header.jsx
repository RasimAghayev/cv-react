import React from "react";
import './header.css';
import CTX from "./CTX";
import HeaderSocials from "./HeaderSocials";
import ME from '../../assets/images/me.png'


const Header=()=>{
    return (
        <header>
            <div className="container header__container">
                <h5>Hello I'm</h5>
                <h1>Rasim Aghayev</h1>
                <h5 className="text-light">FullStack PHP Developer</h5>
                <CTX/>
                <HeaderSocials/>
                <div className="me">
                    <img src={ME} alt="Me" name='Header'/>
                </div>
                <a href="#contact" className="scroll__down">Scroll Down</a>
            </div>
        </header>
    )
}

export default Header