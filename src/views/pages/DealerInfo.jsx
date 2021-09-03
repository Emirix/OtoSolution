import axios from "axios";
import React, { useState, useEffect } from "react";
import Page from "./Page";
import { Redirect } from "react-router-dom";

import map from "../../assets/img/map.jpg";

function AddDealer() {

  const [data,setData] = useState(null);

  useEffect(()=>{
    alert("ID'YE GORE DEALER CEKME APISI LAZIM")
  },[])



  return (
    <Page>
      <div className="sayfa">
        <div className="row m-0">
          <input type="file" name="upload" id="upload" className="d-none" />
          <div className="col-lg-6 col-md-12">
            <div className="mini-title">Dealer Information</div>
            <div className="vd-list">
            <div className="c-title"></div>
            <ul className="c-list">
             
             


                <li>
                    <div className="title">Name</div>    
                    <div className="data">Null</div>    
                </li>

                <li>
                    <div className="title">Description</div>    
                    <div className="data">Null</div>    
                </li>

                <li>
                    <div className="title">ID</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Created By</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Created At</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Updated By</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Phone</div>    
                    <div className="data">123123</div>    
                </li>

            

                <li>
                    <div className="title">Address</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Zip</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">State</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Main Account</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Auto Group</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Total Number of Parking Lots</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Total Cars</div>    
                    <div className="data">123123</div>    
                </li>

              

            </ul>
        </div>

          </div>
          <div className="col-lg-6 col-md-12">
            <div className="add-dealer-sag">
            <img src={map} alt="" />
            <div className="d-flex mt-3">
            <div className="outline-button outline-button-primary height-44 fs-12 px-3  me-3">
          Edit Details
        </div>
            </div>
            </div>
          
          </div>
          
        </div>
      </div>
    </Page>
  );
}

export default AddDealer;
