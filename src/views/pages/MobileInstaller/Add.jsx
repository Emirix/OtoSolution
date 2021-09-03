import React from "react";
import { Redirect } from "react-router-dom";
function Add() {
  if (!localStorage.getItem("key")) {
    return <Redirect to="/login" />;
  } else {
    return (
      <div className="p-3">
        <div className="mini-title">Add New Oto-Link Device</div>
        <div className="r-a__caption">
          To pair Oto-Link with the car follow the steps below.
        </div>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="scanner br-12 mt-4 ">
              <div className="r-a__caption">
                1. Scan&nbsp;<b> SKU barcode</b>&nbsp; on the car or type in
                manually
              </div>
              <div className="scanner__content">
                <div className="barkod barcode"></div>
                <div className="ms-3 rfce">
                  <div className="title mb-3">Scan SKU Number</div>
                  <input type="text" placeholder="SKU" />
                  <div className="hata">Invalid Value</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="scanner br-12 mt-4 ">
              <div className="r-a__caption">
                2. Scan&nbsp;<b>QR Code</b>&nbsp;on the OBD or type in manually
              </div>
              <div className="scanner__content">
                <div className="barkod qr"></div>
                <div className="ms-3 rfce">
                  <div className="title mb-3">Scan OBD Number</div>
                  <input type="text" placeholder="OBD" />
                  <div className="hata">Invalid Value</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <button className="msub">Submit</button>
        </div>
      </div>
    );
  }
}

export default Add;
