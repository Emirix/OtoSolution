import React, { useState, useRef} from "react";
import Page from "./Page";
import LinkedAutosList from "../components/LinkedAutosList";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Unlink() {
  const location = useLocation()
  const [odb, setOdb] = useState("");
  const [status, setStatus] = useState(null);
  const url = new URLSearchParams(window.location.search);

  const [model, setModel] = useState("");
  const [version, setVersion] = useState("");
  const [mDate, setMDate] = useState("");

  const [step, setStep] = useState(1);

  const popup = useRef()

  function close(){
    popup.current.classList.add("d-none")
  }

  function open(){
    popup.current.classList.remove("d-none")
  }

  return (
    <Page>
      <div className="sayfa">
        <div ref={popup} className="popup-bg position-fixed d-flex justify-content-center align-items-center w-100 h-100">
          
          {!location.pathname.includes("unlink") ? 
          <div className="popup bg-white br-12 p-3 d-flex flex-column align-items-center">
            <div className="mini-title">
              {step == 3 ? "You are about to pair" : "Link New Device"}
            </div>
            <img
              src={step == 3 ? "/icons/qr-valid.svg" : "/icons/qr-code.svg"}
              width="130"
              height="130"
              className="mt-3 mb-5"
              alt=""
            />

            {step == 1 ? (
              <>
              <div className="tit-falan">
              Please scan or enter
              Stock number or VIN
              </div>
              
              <div className="form-floating mb-3 next-step">
                <div className="mini-title"></div>
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Enter VIN Number"
                />
                <label htmlFor="floatingInput">Enter VIN Number</label>
              </div></>
            ) : (
              ""
            )}

            {step == 2 ? (
              <>
              <div className="tit-falan">
              Please scan or enter
OTO-Link serial number

              </div>
             
              <div className="form-floating mb-3 next-step">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Enter Device Serial ID"
                />
                <label htmlFor="floatingInput">Enter Device Serial ID</label>
              </div> </>
            ) : (
              ""
            )}

            {step == 3 ? (
              <div className="basarili-linkleme w-75">
                <ul className="c-list ">
                  <li>
                    <div className="title">Vehicle </div>
                    <div className="data">WDBUF70J45A636373 2005 MBZ E500 White</div>
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
                  if(step == 3) {
                    close()
                  }else{
                    if (step < 3) {
                      setStep(step + 1);
                    }
                  }
                 
                }}
              >
                {step == 3 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
          :
          <div className="popup bg-white br-12 p-3 d-flex flex-column align-items-center">
            <div className="mini-title">
              {step == 2 ? "You are about to un-pair" : "Unlink a Device"}
            </div>
          

            {step == 1 ? (
              <>
              <div className="tit-falan w-50  mt-5">Please scan or enter
Stock number, VIN or OTO-Link serial number
</div>
              <div className="form-floating mb-3 next-step">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Enter"
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
                    <div className="data">WDBUF70J45A636373 2005 MBZ E500 White
</div>
                  </li>

                  <li>
                    <div className="title">OTO-Link</div>
                    <div className="data">776348901 Silver Model
</div>
                  </li>

                 
                </ul>
              </div>
            ) : (
              ""
            )}

            <div className="d-flex mt-5  justify-content-between w-100 align-items-center">
              <button onClick={()=>{close()}} className="btn bg-secondary text-white py-2 px-5">
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
                  if(step == 2) {
                    close()
                  }else{
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
          }
        
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
