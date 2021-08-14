import React from 'react'
import VH from '../components/VH';
import car1 from "../../assets/img/car.jpg"
import car2 from "../../assets/img/car2.jpg"

function VehicleDetails() {
    return (
        <div className="sayfa">
            <div className="vehicle-details-header">
                <img src="icons/mark-as-sold.svg" className="add-car-button" />
                <div className="outline-button outline-button-primary height-44 fs-12 px-3 ms-auto me-3">Edit Details</div>
                <img src="icons/delete.svg" className="add-car-button me-3" />
               
            </div>

            <div className="row p-0">
                <div className="mini-title mb-2 mt-3">Vehicle Details</div>
                <div className="br-12 col-lg-6 vd ps-0 h-266 ">
                    <VH
                        src={[car1,car2]}
                        marka="Chervolet"
                        model="Silverado"
                        fiyat="12,500"
                    />
                </div>
            </div>
        </div>
    )
}

export default VehicleDetails
