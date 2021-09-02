import axios from "axios";
import React, { useState, useEffect } from "react";
import CardInfo from "../components/VH/CardInfo";
import Page from "./Page";
import { Redirect } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import map from "../../assets/img/map.jpg";

function AddDealer() {
  return (
    <Page>
      <div className="sayfa">
        <div className="row m-0">
          <input type="file" name="upload" id="upload" className="d-none" />
          <div className="col-lg-6 col-md-12">
            <div className="mini-title">Add New Dealer</div>
            <div className="info-form">
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Description" />
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />  
              <input type="text" placeholder="Zip Code" />  
              <input type="text" placeholder="Main Account" />  
              <input type="text" placeholder="Auto Group" />  
              <input type="text" placeholder="Total Number of Parking Lots" />  
              <input type="text" placeholder="Total Cars" />  
           
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className="add-dealer-sag">
                <div className="mini-title">Map</div>
            <img src={map} alt="" />
            <div className="d-flex mt-3">
                <div className="btn primary-btn">Save</div>
                <div className="btn ms-3 seconadary-btn">Reset Form</div>

                <img src="/icons/delete.svg" className="delete-button ms-auto" />

            </div>
            </div>
          
          </div>
          
        </div>
      </div>
    </Page>
  );
}

export default AddDealer;
