import React from "react";
import VH from "../components/VH/VH";
import car1 from "../../assets/img/car.jpg";
import car2 from "../../assets/img/car2.jpg";
import map from "../../assets/img/map.jpg";
import DataInfo from "../components/VH/DataInfo";
import DataProgress from "../components/VH/DataProgress";
import List from "../components/VH/List";
import SI from "../components/VH/SI";
import RecentActivities from "../components/VH/RecentActivities";
import CardInfo from "../components/VH/CardInfo";
import Page from './Page'

function VehicleDetails() {
  return (
    <Page>
    <div className="sayfa">
      <div className="vehicle-details-header">
        <img src="icons/mark-as-sold.svg" className="add-car-button" />
        <div className="outline-button outline-button-primary height-44 fs-12 px-3 ms-auto me-3">
          Edit Details
        </div>
        <img src="icons/delete.svg" className="add-car-button me-3" />
      </div>

      <div className="row m-0">
        <div className="mini-title mt-3">Vehicle Details</div>
        <div className="br-12 col-lg-6 vd ps-0 h-266 m-0 ">
          <VH
            src={[car1, car2]}
            marka="Chervolet"
            model="Silverado"
            fiyat="12,500"
          />
          <div>
            <div className="data-title-container">
              <DataInfo data="WAUFFAFM3CA000000" title="VIN" />
              <DataInfo data="50,000" title="Milage" />
              <DataInfo data="12345" title="STK" />
              <DataInfo data="5.3L V8" title="Engine" />
              <DataInfo data="A312312" title="Serial ID" />
              <DataInfo data="2012" title="Year" />
            </div>
            <div className="data-progress-container">
              <DataProgress color="yesil" title="Gas" value="20" />

              <DataProgress color="sari" title="Battery" value="40" />

              <DataProgress color="yesil" title="Tire Pressure" value="60" />

              <DataProgress color="sari" title="Temperature" value="55" />

              <DataProgress color="sari" title="Gas" value="90" />

              <DataProgress color="yesil" title="Battery" value="30" />
            </div>
          </div>
        </div>

        <div className="br-12 col-lg-6 vm m-0 h-266">
          <div className="mini-title">Map</div>
          <img src={map} alt="" />
          <div className="vm-button">Get Direction</div>
        </div>
      </div>

      <div className="row m-0 mt-3 gx-3">
          <div className="col">
              <List/>
          </div>
          <div className="col"><List/></div>
          <div className="col">
            <RecentActivities/>
            <CardInfo/>
            <SI/>
        </div>
      </div>
    </div>
    </Page> );
}

export default VehicleDetails;
