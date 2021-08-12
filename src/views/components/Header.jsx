import React from 'react'
import Buyutec from "../../assets/svg/buyutec.svg"
import Bell from "../../assets/svg/bell.svg"
import PP from "../../assets/img/pp.jpg"
import DownArrow from "../../assets/svg/down-arrow-icon2.svg"

function Header() {
    return (
        <div className="header">
            <div className="burger">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <img src={Buyutec} alt="" className="ara" />

            <div className="header-sag ms-auto">
                <div className="bildirim">
                    <img src="icons/notification.svg" alt="" />
                </div>

                <div className="kucuk-profil">
                    <img src={PP} alt="" />
                   <div>
                   <div className="kucuk-profil__title">Emir T.</div>
                    <div className="kucuk-profil__bottom">Autogroup</div>
                   </div>

                   <div className="down-icon">
                       <img src="icons/arrow-down-short.svg" alt="" />
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Header
