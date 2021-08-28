import React,{useEffect} from "react";

import DownArrow from "../../assets/svg/down-arrow-icon.svg";
import Logo from "../../assets/svg/logo.svg";
import {Link,useLocation} from "react-router-dom"
function Sidebar() {
  const location = useLocation();

  useEffect(()=>{
      console.log(location)
  },[location])
  

  function dropdown(e,acikImg,kapaliImg) {
   
    // Li'lerden aktif kaldır
    for(var i = 0; i < document.querySelectorAll("li.active").length;i++){
        document.querySelectorAll("li.active")[i].classList.remove("active")
    }

    if(e.currentTarget.dataset.dropdown == "kapali"){
       document.querySelector(".sidebar").classList.remove("sidebar-kucuk")
       document.querySelector(".page").style.paddingLeft = "231px"
        e.currentTarget.querySelector(".side-dropdown").style.maxHeight = "300px";
        e.currentTarget.querySelector("img").src = acikImg
        e.currentTarget.style.backgroundColor = "white"
        e.currentTarget.dataset.dropdown = "acik"
    }else{
        e.currentTarget.querySelector(".side-dropdown").style.maxHeight = "0px";
        e.currentTarget.style.backgroundColor = "transparent"
        e.currentTarget.querySelector("img").src = kapaliImg

        e.currentTarget.dataset.dropdown = "kapali"

    }
  }

  return (
    
    <div className={location.pathname.includes("mobile") ? "d-none" : "sidebar"}>
      <Link to="/" className="logo">
        <img src={Logo} alt="" />
      </Link>
      <nav>
        <ul>
          <li className={location.pathname == "/" ? "active" : ""}>
            <Link to="/">
            {location.pathname == "/" ?               <img src="/icons/dashboard-active.svg" alt="" />
 :               <img src="/icons/dashboard-inactive.svg" alt="" />
 }
             <span>Dashboard</span>
            </Link>
          </li>

          <li
            onClick={(e) => {
              dropdown(e,"/icons/car-settings-active.svg","/icons/car-settings-inactive.svg");
            }}

            data-dropdown="kapali"
          >
            <a href="#">
              <img src="/icons/car-settings-inactive.svg" alt="" />
              <span>Car Settings</span>
              <div className="arrow">
                <img src={DownArrow} alt="" />
              </div>
            </a>

            <div className="side-dropdown">
              <ul>
                <li>
                  <Link to="/car-list">Car List</Link>
                </li>
                <li>
                  <Link to="/add-new-car">Add New Car</Link>
                </li>
                <li>
                  <Link to="/oto-link">Oto-Link</Link>
                </li>
                <li>
                  <Link to="/vehicle-details">Vehicle Details</Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={location.pathname == "/oto-link" ? "active" : ""}>
            <Link to="/oto-link">

            {
              location.pathname == "/oto-link" ? <img className="is" src="/icons/oto-link-active.svg" alt="" /> : <img className="is" src="/icons/oto-link-inactive.svg" alt="" />
            }
              <span>Oto-Link</span>
            </Link>
          </li>

          <li  className={location.pathname == "/general-settings" ? "active" : ""}>
            <Link to="/general-settings">
              {
                location.pathname == "/general-settings" ?               <img src="/icons/settings-active.svg" alt="" />
                :               <img src="/icons/settings-inactive.svg" alt="" />

              }
              <span>General Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
