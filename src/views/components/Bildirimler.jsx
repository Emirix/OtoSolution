import React from 'react'
import { Link } from 'react-router-dom'
import Bildirim from './Bildirim'

function Bildirimler() {
    return (
        <div className="bildirimler-container">
            <div className="bildirimler-container__header">
                <div className="bc-link active">All</div>
                <div className="bc-link">Events</div>
                <div className="bc-link">Logs</div>
            </div>
            <div className="bildirimler">
                <Bildirim
                    name="Ford, Mustang"
                    vkn="DR1235678909876"
                    status="Parked"
                    location="San Diego"
                    minute="15"
                />

<Bildirim
                    name="Ford, Mustang"
                    vkn="DR1235678909876"
                    status="Service"
                    location="San Diego"
                    minute="15"
                />

<Bildirim
                    name="Ford, Mustang"
                    vkn="DR1235678909876"
                    status="Offline"
                    location="San Diego"
                    minute="15"
                />

<Bildirim
                    name="Ford, Mustang"
                    vkn="DR1235678909876"
                    status="Service"
                    location="San Diego"
                    minute="15"
                />
            </div>
            <div className="bildirimler-container__bottom">
                <Link to="/notifications">See More</Link>
            </div>
        </div>
    )
}

export default Bildirimler
