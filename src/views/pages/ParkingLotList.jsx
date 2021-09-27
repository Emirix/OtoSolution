import React from 'react'
import Page from './Page'
import Table from "../components/LotList";
import {Link} from "react-router-dom"
function ParkingLotList() {
    return (
       <Page>
           <div className="page-wrapper">
           <div className="row mt-3 m-0">
          <div className="d-flex align-items-center mb-3">
            <div className="mini-title">Parking Lot List</div>
            <div className="ms-auto">
              <Link to="/add-lot">
              <img src="icons/add-car.svg" alt="" className="add-car-button me-3" />
              </Link>
             
              <img src="icons/Import-csv.svg" alt="" className="add-car-button me-3" />
              <img src="icons/print.svg" alt="" onClick={()=>{window.print()}} className="me-3 add-car-button" />
            </div>
          </div>

          <div className="table-header-buttons">
            <button>All</button>
            <button className="active">Dealers</button>
          </div>

          <div className="table-header-border"></div>

          


          
        </div>

        <div className="row  mt-3 m-0">
          <div className="tb-container">
          <Table/>
          </div>
        </div>
           </div>
       </Page>
    )
}

export default ParkingLotList
