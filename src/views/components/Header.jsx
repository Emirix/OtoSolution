import React,{useEffect,useState} from 'react'
import Buyutec from "../../assets/svg/buyutec.svg"
import PP from "../../assets/img/c-loading.jpg"
import Bildirimler from './Bildirimler'
import {Link,useLocation} from "react-router-dom"
import axios from 'axios'

function Header() {
    const location = useLocation();
    const [user,setUser] = useState([])
    
    useEffect(()=>{
        axios.get("/api/account/user/",{
            headers:{
                "Authorization" : `Token ${localStorage.getItem("key")}`
            }
        }).then(res=>{
            
            setUser(res.data)
        })
    },[])

    var i = 0;
    function yanMenu(){
        i++;
        console.log(window.innerWidth <= 992)
        const sidebar = document.querySelector(".sidebar");
        if(window.innerWidth <= 992){
            sidebar.style.left = "0"
        }else{
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
        
    }

    return (
        <div className={location.pathname.includes("mobile") || location.pathname.includes("login") ? "d-none" : "header"}>
            <div className="burger" onClick={e=>{yanMenu()}}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
          
            <div className="search">
                    <input type="text" placeholder="Search Car" />
            </div>
            <img src={Buyutec} alt="" className="ara d-none d-lg-block " onClick={(e)=>{
                document.querySelectorAll(".search")[1].classList.add("search-on")
                e.currentTarget.classList.add("arayici")
                e.currentTarget.style.padding = "10px"
            }} />

            <div className="header-sag ms-auto">
                <div className="bildirim bildirim-h " onClick={()=>{
                    document.querySelector(".bildirimler-container").classList.toggle("acik-bc")
                }}>
                    <img src="/icons/notification.svg" alt="" />
                    <Bildirimler/>
                </div>

                <div className="kucuk-profil ms-3 position-relative">
                    <img src={PP} alt="" />
                   <div className="">
                   
                   <div className="kucuk-profil__title">{"James Smith"}</div>
                    <div className="kucuk-profil__bottom">{"San Francisco"}</div>
                   </div>

                   <div className="down-icon">
                       <img src="/icons/arrow-down-short.svg" alt="" />
                   </div>

                   <div className="p-d d-none">
                       <div className="eposta">{user.email}</div>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Header
