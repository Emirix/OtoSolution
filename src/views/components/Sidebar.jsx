import React,{useEffect} from "react";
import DownArrow from "../../assets/svg/down-arrow-icon.svg";
import Logo from "../../assets/svg/logo.svg";
import {Link,useLocation} from "react-router-dom"
function Sidebar() {
  const location = useLocation();

  useEffect(()=>{
      
  },[location])
  

  function dropdown(e,acikImg,kapaliImg) {
   
    // Li'lerden aktif kaldır
    for(var i = 0; i < document.querySelectorAll("li.active").length;i++){
        document.querySelectorAll("li.active")[i].classList.remove("active")
    }

    if(e.currentTarget.dataset.dropdown == "off"){
       //document.querySelectorAll(".side-dropdown").forEach(e=>{e.style.maxHeight="0px"})
       //document.querySelectorAll(".sidebar li").forEach(e=>{e.style.backgroundColor = "transparent"})


       document.querySelector(".sidebar").classList.remove("sidebar-kucuk")
       document.querySelector(".page").style.paddingLeft = "231px"
        e.currentTarget.querySelector(".side-dropdown").style.maxHeight = "300px";
        e.currentTarget.querySelector("img").src = acikImg
        e.currentTarget.style.backgroundColor = "white"
        e.currentTarget.dataset.dropdown = "on"

      
    }else{
        e.currentTarget.querySelector(".side-dropdown").style.maxHeight = "0px";
        e.currentTarget.style.backgroundColor = "transparent"
        e.currentTarget.querySelector("img").src = kapaliImg

        e.currentTarget.dataset.dropdown = "off"

    }
  }

  return (
    
    <div className={location.pathname.includes("mobile") || location.pathname.includes("login") ? "d-none" : "sidebar"}>
      <Link to="/" className="logo">
        <img src={Logo} alt="" />
      </Link>
      <div onClick={()=>{ document.querySelector(".sidebar").style.left="-280px"}} className="close-en d-lg-none position-absolute"></div>
      <div className="d-lg-none search m-0 mt-5 search-on w-215">
                    <input type="text" placeholder="Search Car" />
                    
            </div>
           
      
      <nav>
        <ul>
       


          <li className={location.pathname == "/car-list" ? "active" : ""}>
            <Link to="/car-list">
            {location.pathname == "/car-list" ?               <img src="/icons/car-settings-active.svg" alt="" />
 :               <img src="/icons/car-settings-inactive.svg" alt="" />
 }
             <span>Vehicles</span>
            </Link>
          </li>


         

      
          <li
            onClick={(e) => {
              dropdown(e,"/icons/oto-link-active.svg","/icons/oto-link-inactive.svg");
            }}

            data-dropdown="off"
          >
            <a href="#">
              <img src="/icons/oto-link-inactive.svg" alt="" />
              <span>Oto-Link</span>
              <div className="arrow">
                <img src={DownArrow} alt="" />
              </div>
            </a>

            <div className="side-dropdown">
              <ul>
                <li>
                  <a href="/oto-link">Link</a>
                </li>
                <li>
                  <a href="/unlink">Unlink</a>
                </li>
               
              </ul>
            </div>
          </li>


          <li
            onClick={(e) => {
              dropdown(e,"/icons/settings-active.svg","/icons/settings-inactive.svg");
            }}

            data-dropdown="off"
          >
            <a href="#">
            <img src="/icons/settings-inactive.svg" alt="" />
              <span>General Settings</span>
              <div className="arrow">
                <img src={DownArrow} alt="" />
              </div>
            </a>

            <div className="side-dropdown">
              <ul>
                <li>
                  <Link to="/add-dealer">Add New Dealer</Link>
                </li>
                <li>
                  <Link to="/dealership-list">Dealership List</Link>
                </li>
            
                <li>
                  <Link to="/add-lot">Add New Lot</Link>
                </li>

                <li>
                  <Link to="/parking-lots">Parking Lots List</Link>
                </li>

              
               
              </ul>
            </div>
          </li>


     
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
