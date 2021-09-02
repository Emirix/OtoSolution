import React from "react";
import Page from "./Page";
import Table from "../components/DealerList";

function DealerList() {
  return (
    <Page>
      <div className="sayfa">
        <div className="row mt-3 m-0">
          <div className="d-flex align-items-center mb-3">
            <div className="mini-title">Dealership List</div>
            <div className="ms-auto">
              <img
                src="icons/add-car.svg"
                alt=""
                className="add-car-button me-3"
              />
              <img
                src="icons/Import-csv.svg"
                alt=""
                className="add-car-button me-3"
              />
              <img
                src="icons/print.svg"
                alt=""
                onClick={() => {
                  window.print();
                }}
                className="me-3 add-car-button"
              />
            </div>
          </div>
        </div>
        <div className="row  mt-3 m-0">
          <div className="tb-container">
          <Table/>
          </div>
        </div>
      
      </div>
    </Page>
  );
}

export default DealerList;
