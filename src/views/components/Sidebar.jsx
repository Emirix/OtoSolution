import React,{useEffect} from "react";
import CarIcon from "../../assets/svg/car-icon.svg";
import CarIconActive from "../../assets/svg/car-icon.svg";
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
    <div className="sidebar">
      <Link to="/" className="logo">
        <img src={Logo} alt="" />
      </Link>
      <nav>
        <ul>
          <li className={location.pathname == "/" ? "active" : ""}>
            <Link to="/">
              <img src="icons/dashboard-active.svg" alt="" />
             <span>Dashboard</span>
            </Link>
          </li>

          <li
            onClick={(e) => {
              dropdown(e,"icons/car-settings-active.svg","icons/car-settings-inactive.svg");
            }}

            data-dropdown="kapali"
          >
            <a href="#">
              <img src="icons/car-settings-inactive.svg" alt="" />
              <span>Car Settings</span>
              <div className="arrow">
                <img src={DownArrow} alt="" />
              </div>
            </a>

            <div className="side-dropdown">
              <ul>
                <li>
                  <a href="">Car List</a>
                </li>
                <li>
                  <Link to="/add-new-car">Add New Car</Link>
                </li>
                <li>
                  <a href="">Oto-Link</a>
                </li>
                <li>
                  <Link to="/vehicle-details">Vehicle Details</Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href="#">
              <img src={CarIcon} alt="" />
              <span>Oto-Link</span>
            </a>
          </li>

          <li>
            <a href="#">
              <img src={CarIcon} alt="" />
              <span>General Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
