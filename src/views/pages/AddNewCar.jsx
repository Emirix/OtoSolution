import React from 'react'
import CardInfo from '../components/VH/CardInfo'
import Page from './Page'

function AddNewCar({bg,title}) {
    return (
        <Page>
        <div className="sayfa">
            <div className="row m-0">
                <input type="file" name="upload" id="upload" className="d-none" />
                <div className="col-lg-6 col-md-12">
                    <div className="add-car-image">
                        <div className="mini-title">Add New Car</div>
                        <label htmlFor="upload" id="upload">
                            <div className="sol">
                                <img src="icons/camera-solid.svg" alt="" />
                            </div>
                            <div className="sag">
                                upload images<br/>or<br/>drag&drop here
                            </div>
                        </label>
                    </div>

                    <div className="as">
                        <div className="mini-title"></div>
                        <CardInfo/>
                    </div>
                </div>
                <div className="col-lg-6 col-md-12">
                <div className="mini-title">Vehicle Information</div>
                <div className="info-form">
                    <input type="text" placeholder="STK" />
                    <input type="text" placeholder="VIN" />
                    <input type="text" placeholder="Serial ID" />
                    <input type="text" placeholder="Make" />
                    <input type="text" placeholder="Model" />
                    <input type="text" placeholder="Year" />
                    <input type="text" placeholder="Color" />
                    <input type="text" placeholder="Style" />
                    <input type="text" placeholder="Made in" />
                    <input type="text" placeholder="Steering Type" />
                </div>
                </div>
            </div>
        </div>
        </Page> )
}

export default AddNewCar
