import React from 'react'

function RecentActivities() {
    return (
        <div className="r-a">
            <div className="r-a__title">Recent Activites</div>
            <div className="r-a__caption">Today</div>
            <div className="timelist">

                <div className="time">
                    <div className="saat">08:42</div>
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Engine Started</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="saat">10:00</div>
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Parked</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="saat">14:37</div>
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Test Drive</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="saat">15:00</div>
                    <div className="yuvarlak yuvarlak-mavi"></div>
                    <div className="durum">Back from Test Drive</div>
                </div>

                
            </div>
        </div>
    )
}

export default RecentActivities
