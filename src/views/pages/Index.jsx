import React, { Component } from "react";
import QA from "../components/QA";
import SemiCircleProgressBar from "react-progressbar-semicircle";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import BA from "../components/BA";
import MotionCars from "../components/MotionCars";
import DataTable from "../components/DataTable"
export default class Index extends Component {
  render() {
    return (
      <div className="sayfa">
        <div className="row m-0">
          <div className="col-xl-6 col-md-12">
            <div className="mini-title mb-3">Quick Actions</div>
            <div className="mini-container">
              <QA
                src="icons/low-gas-red.svg"
                title="Tire Presuare"
                status="Low"
                color="#F64E60"
              />

              <QA
                src="icons/service-green.svg"
                title="Tire Presuare"
                status="Running"
                color="#3DCC7A"
              />

              <QA
                src="icons/battery-green.svg"
                title="Tire Presuare"
                status="Low"
                color="#F64E60"
              />

              <QA
                src="icons/service-red.svg"
                title="Tire Presuare"
                status="Low"
                color="#F64E60"
              />

              <QA
                src="icons/low-gas-green.svg"
                title="Tire Presuare"
                status="Low"
                color="#F64E60"
              />

              <QA
                src="icons/low-gas-red.svg"
                title="Tire Presuare"
                status="Low"
                color="#F64E60"
              />
            </div>
          </div>

          <div className="col-xl-6 col-md-12">
            <div className="mini-title mb-3">Summary</div>
            <div className="mini-container">
              <div className="">
                <div className="semi-bar">
                  <SemiCircleProgressBar
                    percentage={33}
                    stroke="#1BC3BB"
                    background="#7075F6"
                  />
                  <div className="semi-bar__option">
                    <div className="title">8,350</div>
                    <div className="bottom">Total Cars</div>
                  </div>

                  <div className="semi-bar__option">
                    <div className="title">1,264</div>
                    <div className="bottom">Ready for Customer</div>
                  </div>
                </div>
                <div className="circu-bar mt-3">
                  <CircularProgressbar
                    value={31}
                    text={`31 %`}
                    strokeWidth={9}
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
              </div>
              <div className="col d-flex flex-wrap ">
                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
                />

                <BA
                  src="icons/service-yellow.svg"
                  sayi="24"
                  caption="Low Gas"
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
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />

            <MotionCars
              src={[
                "url(https://imgd.aeplcdn.com/0x0/n/cw/ec/27032/s60-exterior-right-front-three-quarter-3.jpeg)",
                "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/new-ghost-white-fr-3-4-1-1598911711.jpg)",
              ]}
              marka={"Toyota"}
              model="Corolla"
              since="1:32"
            />
          </div>
        </div>

        <div className="row mt-3 m-0">
          <div className="d-flex align-items-center mb-3">
            <div className="mini-title">Car List</div>
            <div className="ms-auto">
              <img src="icons/add-car.svg" alt="" className="add-car-button me-3" />
              <img src="icons/Import-csv.svg" alt="" className="add-car-button me-3" />
              <img src="icons/print.svg" alt="" onClick={()=>{window.print()}} className="me-3 add-car-button" />
            </div>
          </div>

          <div className="table-header-buttons">
            <button>All</button>
            <button className="active">Dealers</button>
          </div>

          <div className="table-header-border"></div>

          <div className="table-header-buttons">
            <button>Success Automotive</button>
            <button>Real Cars</button>
            <button className="active">General Auto</button>
          </div>

          <div className="table-header-border"></div>
          <div className="table-header-buttons">
           
            <button className="active">All</button>
            <button>Parking Lot 1</button>
            <button>Parking Lot 2</button>
            <button>Parking Lot 3</button>
            <button>Parking Lot 4</button>
            <button>Parking Lot 5</button>
            <button>Parking Lot 6 </button>
          </div>

          
        </div>

        <div className="row  mt-3 m-0">
          <div className="tb-container">
          <DataTable/>
          </div>
        </div>
      </div>
    );
  }
}
