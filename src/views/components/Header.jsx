import React from 'react'
import Buyutec from "../../assets/svg/buyutec.svg"
import Bell from "../../assets/svg/bell.svg"
import PP from "../../assets/img/pp.jpg"
import DownArrow from "../../assets/svg/down-arrow-icon2.svg"
import Bildirimler from './Bildirimler'
import {Link,useLocation} from "react-router-dom"

function Header() {
    const location = useLocation();

    var i = 0;
    function yanMenu(){
        i++;
        const sidebar = document.querySelector(".sidebar");
        
        if(i%2==0){
            sidebar.classList.remove("sidebar-kucuk")
            document.querySelector(".page").style.paddingLeft = "231px"
            document.querySelector(".burger").style.alignItems = "flex-end"

        }else{
            sidebar.classList.add("sidebar-kucuk")
            document.querySelector(".page").style.paddingLeft = "124px"
            document.querySelector(".burger").style.alignItems = "flex-start"

        }
    }

    return (
        <div className={location.pathname.includes("mobile") ? "d-none" : "header"}>
            <div className="burger" onClick={e=>{yanMenu()}}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
          
            <div className="search">
                    <input type="text" placeholder="Search Car" />
            </div>
            <img src={Buyutec} alt="" className="ara " onClick={(e)=>{
                document.querySelector(".search").classList.add("search-acik")
                e.currentTarget.classList.add("arayici")
                e.currentTarget.style.padding = "10px"
            }} />

            <div className="header-sag ms-auto">
                <div className="bildirim bildirim-h " onClick={()=>{
                    document.querySelector(".bildirimler-container").classList.toggle("acik-bc")
                }}>
                    <img src="icons/notification.svg" alt="" />
                    <Bildirimler/>
                </div>

                <div className="kucuk-profil ms-3">
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
