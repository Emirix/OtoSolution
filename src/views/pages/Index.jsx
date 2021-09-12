import React, { Component } from "react";
import QA from "../components/QA";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BA from "../components/BA";
import MotionCars from "../components/MotionCars";
import { Link,Redirect } from "react-router-dom";

import DataTable from "../components/DataTable"
import Page from "./Page";
import axios from "axios";
export default class Index extends Component {
  constructor(){
    super()
    this.state = {
      carList:[],
      parkingLots:[],
      dealers:[],
      lotFiltre:null,
      dealerFiltre:null
      
    }
  }
  componentDidMount(){
    axios.all([
      axios.get(`/api/dealer/vehicles`), 
      axios.get(`/api/dealer/lots`),
      axios.get("/admin/api/dealers",{
        headers:{
          "Authorization" : `Token ${localStorage.getItem("key")}`
        }
      })
    ])
    .then(axios.spread((car, lot,dealer) => {
      this.setState({
        carList:car.data,
        parkingLots:lot.data,
        dealers:dealer.data
      })
     
      console.log(dealer.data)
      
      
    }));
  }


  render() {
    if(!localStorage.getItem("key")){
     return <Redirect to="/login" />
    }else{
    return (
      <Page>
      <div className="sayfa">
        <div className="row m-0">
          <div className="col-xl-6 col-md-12">
            <div className="mini-title mb-3">Quick Actions</div>
            <div className="mini-container position-relative">
              <div className="premium-container br-12">
                <button className="mor-button" onClick={()=>{
                  document.querySelector(".premium-container").classList.add("premium-kapali")
                }}>Get Premium</button>
              </div>
              <QA
                src="icons/low-gas-red.svg"
                title="All Doors"
                status="Lock"
                color="#F64E60"
                key={0}
              />

              <QA
                src="icons/service-green.svg"
                title="All Windows"
                status="Roll Down"
                color="#3DCC7A"key={1}
              />

              <QA
                src="icons/battery-green.svg"
                title="All Trunk"
                status="Open"
                color="#F64E60"key={2}
              />

              <QA
                src="icons/service-red.svg"
                title="All Sunroof"
                status="Close"
                color="#F64E60"key={3}
              />

              <QA
                src="icons/low-gas-green.svg"
                title="Car Engine"
                status="Start"
                color="#F64E60"key={4}
              />

              <QA
                src="icons/low-gas-red.svg"
                title="Car Immobilize"
                status=""
                color="#F64E60"key={5}
              />
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="mini-title mb-3">Summary</div>
            <div className="mini-container mini-container-responsive">
              <div className="graph-kir">
                <div className="semi-bar ">
                  <SemiCircleProgressBar
                    percentage={this.state.carList.count || 0}
                    key={0}
                    stroke="#1BC3BB"
                    background="#7075F6"
                  />
                  <div className="semi-bar__option">
                    <div className="title">{this.state.carList.count || "0"}</div>
                    <div className="bottom">Total Cars</div>
                  </div>

                  <div className="semi-bar__option">
                    <div className="title">1,264</div>
                    <div className="bottom">Ready for Customer</div>
                  </div>
                </div>
                <div className="c-2">

               
                <div className="circu-bar mt-3">
                  <CircularProgressbar
                    value={31}
                    text={`31 %`}
                    strokeWidth={9}
                    key={0}
                    styles={buildStyles({
                      pathColor: `#0BB783`,
                      trailColor: "#D7F9EF",
                      textSize: "24px",
                      textColor: "#000",
                      textWeight: "bold",
                    })}
                  />

                  <div className="circu-bar__option">
                    <div className="option-table">
                      Parked Cars <span>6,173</span>
                    </div>
                    <div className="option-table">
                      Not Parked <span>2,031</span>
                    </div>
                  </div>
                </div>
                </div> </div>
              <div className="col d-flex flex-wrap ps-3 jspr ">
                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                  key={0}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Tire Pressure"
                  key={1}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Engine Oil Change"key={2}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Fluid Level"key={3}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low TRANSMISSION FLUID"key={4}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Brakes & brake pads replacement"key={5}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Battery"key={6}
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Air Filter Replace"key={7}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 m-0">
          <div className="mini-title mb-3">Cars in Motion</div>
          <div className="motion-container pb-3">
            <MotionCars
              src={[
                "url(https://cdn.motor1.com/images/mgl/2bqMx/s1/2019-subaru-ascent-review.jpg)",
                "url(https://www.cnet.com/a/img/numGAUYySR62imJg9QFWR2o9Qhs=/2018/07/13/b8f7a40b-82c7-4c34-8bb9-d18b064db4a5/ogi1-001-2019-subaru-ascent-review.jpg)",
                
              ]}
              marka={"Subaru"}
              model="Ascent"
              since="5:29"
              key={0}
              deger={[20,10,91,29]}
            />

            
            <MotionCars
              src={[
                "url(https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/2019-Honda-CR-V-vti-e7-1001x565p.JPG)",
                "url(https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg__marking_background__sm_/v1/editorial/2019-Honda-CR-V-vti-e7-1200x800p%20%281%29.JPG)",
              ]}
              marka={"Honda"}
              model="CR-V"
              since="2:19"key={2}
              deger={[15,20,100,40]}

            />

          
            <MotionCars
              src={[
                "url(https://media.autoexpress.co.uk/image/private/s--X-WVjvBW--/f_auto,t_content-image-full-desktop@1/v1562246208/autoexpress/2018/04/dsc_3132_1.jpg)",
                "url(https://media.wired.com/photos/59af3206fb5fbc7d7601e7a4/master/w_2560%2Cc_limit/nissanleaf-TA.jpg)",
              ]}
              marka={"Nissan"}
              model="Leaf"
              since="8:19"key={4}
              deger={[30,60,10,70]}

            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"key={5}
              deger={[15,90,30,44]}

            />


<MotionCars
              src={[
                "url(https://cdn.motor1.com/images/mgl/jvjqN/s1/mercedes-e-klasse-2020.jpg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2021-mercedes-benz-e-class-102-1583172962.jpg?crop=0.897xw:0.673xh;0.0865xw,0.216xh&resize=1200:*)",
              ]}
              marka={"MERCEDES-BENZ"}
              model="E-Class"
              since="7:18"key={1}
              deger={[45,70,50,100]}
            />


        
          </div>
        </div>
              <iframe title="print frame" className="d-none"></iframe>
        <div className="row mt-3 m-0">
          <div className="d-flex align-items-center mb-3 mobile-car-list flex-wrap">
            <div className="mini-title">Car List</div>
            <div className="ms-auto">
              <Link to="/add-new-car">
              <img src="icons/add-car.svg" alt="" className="add-car-button me-3" />

              </Link>
              <img src="icons/Import-csv.svg" alt="" className="add-car-button me-3" />
              <img src="icons/print.svg" alt="" onClick={()=>{
                var content = document.querySelector(".tb-container");
                var pri = document.querySelector("iframe").contentWindow;
                document.querySelector(".emir-pagination").style.display = "none"
                for(var i=0;i < document.querySelectorAll(".row-search").length; i++){
                  document.querySelectorAll(".row-search")[i].style.display="none"
                }

                pri.document.open();
                pri.document.write(content.innerHTML);
                pri.document.close();
                pri.focus();
                pri.print();
                document.querySelector(".emir-pagination").style.display = "flex"
                for(var i=0;i < document.querySelectorAll(".row-search").length; i++){
                  document.querySelectorAll(".row-search")[i].style.display="block"
                }

              }} className="me-3 add-car-button" />
            </div>
          </div>

          <div className="table-header-buttons">
            <button>All</button>
            <button className="active">Dealers</button>
          </div>

          <div className="table-header-border"></div>

          <div className="table-header-buttons dealer-buttons">
            <button className="active" onClick={e=>{
                    document.querySelectorAll(".dealer-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    this.setState({dealerFiltre:null})
                  }}>All</button>
            {
              this.state.dealers.length != 0 ?
              this.state.dealers.results.map((val,i)=>{
                return(
                  <button onClick={e=>{
                    document.querySelectorAll(".dealer-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    this.setState({dealerFiltre:e.currentTarget.dataset.id})
                  }} data-id={val.id} title={val.address} key={i}>{val.name}</button>
                )
              }) : <div className="d-flex">
              <div className="skeleton-text-yuksek w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
              <div className="skeleton-text-yuksek ms-3 w-50px"></div>
                            </div>
            }
          </div>

          <div className="table-header-border"></div>
          <div className="table-header-buttons lot-buttons">
           
            <button className="active" onClick={e=>{
                    document.querySelectorAll(".lot-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    this.setState({lotFiltre:null})
                  }}>All</button>
            {
              this.state.parkingLots.length != 0 ?
              this.state.parkingLots.results.map((val,i)=>{
                return(
                  <button onClick={e=>{
                    document.querySelectorAll(".lot-buttons button").forEach(e=>e.classList.remove("active"))
                    e.currentTarget.classList.add("active")
                    this.setState({lotFiltre:e.currentTarget.dataset.id})
                  }} data-id={val.id} title={val.address} key={i}>{val.name}</button>
                )
              }) : <div className="d-flex">
<div className="skeleton-text-yuksek w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
<div className="skeleton-text-yuksek ms-3 w-50px"></div>
              </div>
            }
              
          </div>

          
        </div>

        <div className="row  mt-3 m-0">
          <div className="tb-container">
          <DataTable key={0} lotFiltre={this.state.lotFiltre} dealerFiltre={this.state.dealerFiltre} />
          </div>
        </div>
      </div>
      </Page> );
  }}
}
