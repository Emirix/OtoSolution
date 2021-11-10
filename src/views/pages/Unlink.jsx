import React, { useState, useRef} from "react";
import Page from "./Page";
import LinkedAutosList from "../components/LinkedAutosList";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Unlink() {

  const [vinStock, setVinStock] = useState("");
  const [serialID, setSerialID] = useState("");
  const [step, setStep] = useState(1);
  const [err, setErr] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [data,setData] = useState(null)
  const popup = useRef()

  function pair() {
    if (vinStock.length > 15) {
      // VIN
      axios
        .post(
          "/api/dealer/vehicles/unpair-device/",
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
          setData(res.data)
          console.log(res);
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
          "/api/dealer/vehicles/unpair-device/",
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


  function close(){
    popup.current.classList.add("d-none")
  }

  function open(){
    popup.current.classList.remove("d-none")
  }

  return (
    <Page>
      <div className="page-wrapper">
        <div ref={popup} className="popup-bg position-fixed d-flex justify-content-center align-items-center w-100 h-100">
          
       
          <div className="popup bg-white br-12 p-3 d-flex flex-column align-items-center">
            <div className="mini-title">
              {step == 3 ? "You are about to un-pair" : "Unlink a Device"}
            </div>
          

            {step == 1 ? (
              <>
              <div className="popup-title-component w-50  mt-5">Please scan or enter
Stock number, VIN or OTO-Link Device ID
              </div>
              <div className="form-floating mb-3 next-step">
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
                  <div className="popup-title-component mt-5">
                    Please scan or enter OTO-Link serial number
                  </div>
                  <div className="form-floating mb-3 next-step">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter Device Device ID"
                      value={serialID}
                      onChange={(e) => setSerialID(e.target.value)}
                    />
                    <label htmlFor="floatingInput">
                      Enter Device Device ID
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
                        <div className="data">{data != null ? data.device_serial_no : ""}</div>
                      </li>
                    </ul>
                  </div>
                ) : "Checking..."
              ) : ""}

            <div className="d-flex mt-5  justify-content-between w-100 align-items-center">
              <button onClick={()=>{close()}} className="btn bg-secondary text-white py-2 px-5">
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
                    alert("Device ID can not be empty.");
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
                {step == 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
          
        
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

export default Unlink;
