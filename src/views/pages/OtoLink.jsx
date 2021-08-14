import React from 'react'
import OtoLinkC from '../components/OtoLinkC'
import DataTable from "../components/DataTable"

function OtoLink() {
    return (
        <div className="sayfa">
            <div className="row m-0">
                <div className="mini-title">Add New Oto-link Device</div>
                <div className="col-lg-6 col-md-12">
                    <OtoLinkC desc="SKU" img="icons/barcode-invalid.svg" validImg="icons/barcode-valid.svg"/>
                </div>
                <div className="col-lg-6 col-md-12">
                <OtoLinkC desc="OBD" img="icons/qr-invalid.svg" validImg="icons/qr-valid.svg"/>

                </div>
                <div className="row">
                    <div className="btn btn-yesil w-25 mx-auto my-3">Submit</div>
                </div>
            </div>

            <div className="row  mt-3 m-0">
                <div className="mini-title mb-3">Recently Added</div>
          <div className="tb-container">
          <DataTable/>
          </div>
        </div>
        </div>
    )
}

export default OtoLink 
