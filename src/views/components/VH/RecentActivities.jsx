import React from 'react'
import Spinner from "../../components/Spinner/Spinner"

function RecentActivities({data}) {
    return (
        <div className="r-a ">
            <div className="c-title">Status Information</div>
            <div className="r-a__caption">Today</div>
            {data != null ? 
            <div className="timelist">

{data.status == 0 || data.status == null ? <div className="time">
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Oto Link Power Off</div>
                </div> : ""}

                {data.status == 1 ? <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On (Not Connected to ODB)</div>
                </div> : ""}

                {data.status ==2 ? <> <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Oto Link Connected to ODB</div>
                </div>

                </>: ""}

                {data.status == 3 ? <> <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On (Connected to ODB)</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Ignition On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Engine Off</div>
                </div>

                </>: ""}

                {data.status == 4 ? <> 
                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Engine On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Car Stationary</div>
                </div>

                </>: ""}

                {data.status == 5 ? <> 
                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Engine On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Car Moving</div>
                </div>

                </>: ""}


             
              
                {/*
                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Parked</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-red"></div>
                    <div className="durum">Test Drive</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-mavi"></div>
                    <div className="durum">Back from Test Drive</div>
                </div>

                */}



                
            </div>
        : <div className="mt-3 mb-2 d-flex justify-content-center "><Spinner size={35}/></div>}
        </div>
    )
}

export default RecentActivities
