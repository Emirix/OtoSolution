import React from 'react'
import {useLocation} from "react-router-dom"
import Logo from "../../../assets/svg/logo.svg";
import Buyutec from "../../../assets/svg/buyutec.svg"

function Header() {
    const location = useLocation();
    return (
        <div className={location.pathname.includes("mobile") ? "mobile-header" : "d-none"} >
            <div className="burger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>

            <img src={Logo} alt="" />

            <img src={Buyutec} alt="" className="mobile-buyutec" />

            
        </div>
    )
}

export default Header
