import React, { useState, useRef } from "react";
import Page from "./Page";
import LinkedAutosList from "../components/LinkedAutosList";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

function OtoLink() {
  const location = useLocation();
  const url = new URLSearchParams(window.location.search);
  const [step, setStep] = useState(1);
  const popup = useRef();

  const [vinStock, setVinStock] = useState("");
  const [serialID, setSerialID] = useState("");
  const [err, setErr] = useState(false);
  const [data,setData] = useState(null)
  const [showResult, setShowResult] = useState(false);
  function pair() {
    if (vinStock.length > 15) {
      // VIN
      axios
        .post(
          "/api/dealer/vehicles/pair-device/",
          {
            device_serial_no: Number(serialID),
            stock_no: null,
            vin: vinStock,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")}`,
            },
          }
        )
        .then((res) => {
          console.log("VIN PAIRED");
          setErr(false);
          setShowResult(true);
          setStep(3);
          console.log(res);          
          setData(res.data)

        })
        .catch((err) => {
          setErr(true);
          setShowResult(true);

          setStep(3);
        });
    } else if (vinStock.length == 0) {
      // alert("VIN/STOCK can not be empty.")
    } else {
      axios
        .post(
          "/api/dealer/vehicles/pair-device/",
          {
            device_serial_no: Number(serialID),
            stock_no: vinStock,
            vin: null,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("key")}`,
            },
          }
        )
        .then((res) => {
          setStep(3);
          console.log("STOCK NO PAIRED");
          console.log(res);
          setErr(false);
          setData(res.data)
          
          setShowResult(true);
        })
        .catch((err) => {
          setErr(true);
          setStep(3);
          setShowResult(true);
        });
    }
  }

  function close() {
    popup.current.classList.add("d-none");
  }

  function open() {
    popup.current.classList.remove("d-none");
  }

  return (
    <Page>
      <div className="page-wrapper">
        <div
          ref={popup}
          className="popup-bg position-fixed d-flex justify-content-center align-items-center w-100 h-100"
        >
          {!location.pathname.includes("unlink") ? (
            <div className="popup bg-white br-12 p-3 d-flex flex-column align-items-center">
              <div className="mini-title">
                {step == 3
                  ? err
                    ? "Pair failed"
                    : "You are about to pair"
                  : "Link New Device"}
              </div>
              <img
                src={
                  step == 3
                    ? err
                      ? "/icons/qr-invalid.svg"
                      : "/icons/qr-valid.svg"
                    : "/icons/qr-code.svg"
                }
                width="130"
                height="130"
                className="mt-3 mb-5"
                alt=""
              />

              {step == 1 ? (
                <>
                  <div className="popup-title-component">
                    Please scan or enter Stock number or VIN
                  </div>

                  <div className="form-floating mb-3 next-step ">
                    <div className="mini-title"></div>
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="VIN or Stock Number"
                      value={vinStock}
                      onChange={(e) => setVinStock(e.target.value)}
                    />
                    <label htmlFor="floatingInput">VIN or Stock Number</label>
                  </div>
                </>
              ) : (
                ""
              )}

              {step == 2 ? (
                <>
                  <div className="popup-title-component">
                    Please scan or enter OTO-Link serial number
                  </div>
                  <div className="form-floating mb-3 next-step">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter Device Serial ID"
                      value={serialID}
                      onChange={(e) => setSerialID(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      Enter Device Serial ID
                    </label>
                  </div>{" "}
                </>
              ) : (
                ""
              )}

              {step == 3 ? (
              showResult ?  err ? (
                  <div className="hata-linkleme w-75">
                    <p className="text-center">Pair Failed</p>
                  </div>
                ) : (
                  <div className="basarili-linkleme w-75">
                    <ul className="c-list ">
                      <li>
                        <div className="title">Vehicle </div>
                        <div className="data">
                        {data != null ? data.vin.vin + " " +data.vin.brand_name + " " + data.vin.model_name + " " + data.color_name  : ""}

                        </div>
                      </li>

                      <li>
                        <div className="title">OTO-Link</div>
                        <div className="data">{data != null ? data.device_serial_no  : ""}</div>
                      </li>
                    </ul>
                  </div>
                ) : "Checking..."
              ) : ""}

              <div className="d-flex mt-5  justify-content-between w-100 align-items-center">
                <button
                  onClick={() => {
                    close();
                  }}
                  className="btn bg-secondary text-white py-2 px-5"
                >
                  Close
                </button>
                <div className="step-container">
                  <div className="d-flex">
                    <div
                      className={step == 1 ? "step me-2 active" : "step me-2"}
                    ></div>
                    <div className={step == 2 ? "step active" : "step"}></div>
                    <div
                      className={step == 3 ? "step ms-2 active" : "step ms-2"}
                    ></div>
                  </div>
                  <div className="step-title">Step {step}</div>
                </div>
                <button
                  className="btn bg-primary text-white py-2 px-5"
                  onClick={() => {
                    if (step == 1 && vinStock.trim().length == 0) {
                      alert("VIN/STOCK can not be empty.");
                    } else if (step == 2 && serialID.trim().length == 0) {
                      alert("Serial ID can not be empty.");
                    } else {
                      if (step < 3) {
                        setStep(step + 1);
                      }
                      if (step == 2) {
                        pair();
                      }

                      if(step == 3){
                        close()
                      }

                      console.log(step);
                    }
                  }}
                >
                  {step == 3 ? "Okey" : "Next"}
                </button>
              </div>
            </div>
          ) : (
            <div className="popup bg-white br-12 p-3 d-flex flex-column align-items-center">
              <div className="mini-title">
                {step == 2 ? "You are about to un-pair" : "Unlink a Device"}
              </div>

              {step == 1 ? (
                <>
                  <div className="popup-title-component w-75  mt-5">
                    
                  </div>
                  <div className="form-floating mb-3 next-step">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="VIN or Stock Number"
                    />
                    <label htmlFor="floatingInput">Enter</label>
                  </div>
                </>
              ) : (
                ""
              )}

              {step == 2 ? (
                <div className="basarili-linkleme w-75">
                  <ul className="c-list mt-5 ">
                    <li>
                      <div className="title">Vehicle</div>
                      <div className="data">
                        WDBUF70J45A636373 2005 MBZ E500 White
                      </div>
                    </li>

                    <li>
                      <div className="title">OTO-Link</div>
                      <div className="data">776348901 Silver Model</div>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}

              <div className="d-flex mt-5  justify-content-between w-100 align-items-center">
                <button
                  onClick={() => {
                    close();
                  }}
                  className="btn bg-secondary text-white py-2 px-5"
                >
                  Close
                </button>
                <div className="step-container">
                  <div className="d-flex">
                    <div
                      className={step == 1 ? "step me-2 active" : "step "}
                    ></div>

                    <div
                      className={step == 2 ? "step ms-2 active" : "step ms-2"}
                    ></div>
                  </div>
                  <div className="step-title">Step {step}</div>
                </div>
                <button
                  className="btn bg-primary text-white py-2 px-5"
                  onClick={() => {
                    if (step == 2) {
                      close();
                    } else {
                      if (step < 2) {
                        setStep(step + 1);
                      }
                    }
                  }}
                >
                  {step == 2 ? "Submit" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="row  mt-3 m-0">
          <div className="mini-title mb-3">Recently Added</div>
          <div className="tb-container">
            <LinkedAutosList />
          </div>
        </div>
      </div>
    </Page>
  );
}

export default OtoLink;
