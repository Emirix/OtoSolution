import React,{useEffect} from "react";
import CarIcon from "../../assets/svg/car-icon.svg";
import CarIconActive from "../../assets/svg/car-icon.svg";
import DownArrow from "../../assets/svg/down-arrow-icon.svg";
import Logo from "../../assets/svg/logo.svg";

function Sidebar() {

  useEffect(()=>{
    
  },[])
  

  function dropdown(e,acikImg,kapaliImg) {
   
    // Li'lerden aktif kaldır
    for(var i = 0; i < document.querySelectorAll("li.active").length;i++){
        document.querySelectorAll("li.active")[i].classList.remove("active")
    }

    if(e.currentTarget.dataset.dropdown == "kapali"){
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
      <a href="#" className="logo">
        <img src={Logo} alt="" />
      </a>
      <nav>
        <ul>
          <li className="active">
            <a href="#">
              <img src="icons/dashboard-active.svg" alt="" />
              Dashboard
            </a>
          </li>

          <li
            onClick={(e) => {
              dropdown(e,"icons/car-settings-active.svg","icons/car-settings-inactive.svg");
            }}

            data-dropdown="kapali"
          >
            <a href="#">
              <img src="icons/car-settings-inactive.svg" alt="" />
              Car Settings
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
                  <a href="">Add New Car</a>
                </li>
                <li>
                  <a href="">Oto-Link</a>
                </li>
                <li>
                  <a href="">Vehicle Details</a>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <a href="#">
              <img src={CarIcon} alt="" />
              Oto-Link
            </a>
          </li>

          <li>
            <a href="#">
              <img src={CarIcon} alt="" />
              General Settings
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
