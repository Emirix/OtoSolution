import React,{useEffect,useState} from 'react'
import Spinner from "../../components/Spinner/Spinner"

function RecentActivities({data}) {
    const [status,setStatus] = useState(null);
    const [color,setColor] = useState(null)
    useEffect(()=>{
        if(data == null){
            return
        }
        console.log("Effect");
        console.log(data)
        const _status = data.status;
        const _rpm = data.rpm
        const _speed = data.speed
        const _gps = data.lat
        const _connection = data.connection_type
        const _voltage = data.battery
        
        // STATUS 0
        // Hepsi Null İse
        if(
            _connection == null &&
            _gps == null &&
            _speed == null &&
            _rpm == null  &&
            _voltage == null
        ){
            setStatus(0);
            if(0 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

          // STATUS 1
        // Hepsi Null, GPS null değil ise
        if(
            _connection == null &&
            _gps != null &&
            _speed == null &&
            _rpm == null  &&
            _voltage == null
        ){
            setStatus(2);
            if(2 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

      // STATUS 2
        // Connection, Voltage, GPS boş değil, speed ve rpm null ise
        if(
            _connection != null &&
            _gps != null &&
            _speed == null &&
            _rpm == null  &&
            _voltage != null
        ){
            setStatus(2);
            if(2 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

         // STATUS 3
        // Connection, Voltage, GPS, boş/null değilse, RPM ve Speed 0 ise :
        if(
            _connection != null &&
            _gps != null &&
            _speed == 0 &&
            _rpm == 0  &&
            _voltage != null
        ){
            setStatus(3);
            if(3 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

        

        // STATUS 4
        // Connection, Voltage, GPS, boş/null değilse, RPM 0'dan büyük ve Speed 0 ise :
        if(
            _connection != null &&
            _gps != null &&
            _speed == 0 &&
            _rpm > 0  &&
            _voltage != null
        ){
            setStatus(4);
            if(4 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }


         // STATUS 5
        // Tüm Değerler Var İse
        if(
            _connection != null &&
            _gps != null &&
            _speed != null &&
            _rpm  != null  &&
            _voltage != null
        ){
            setStatus(5);
            if(5 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

    },[data])
    return (
        <div className="r-a ">
            <div className="c-title">Status Information</div>
            <div className="r-a__caption">Today</div>
            {data != null ? 
            <div className="timelist">

{status == 0 || data.status == null ? <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link Power Off</div>
                </div> : ""}

                {status == 1 ? <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On (Not Connected to OBD)</div>
                </div> : ""}

                {status ==2 ? <> <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className="yuvarlak yuvarlak-yesil"></div>
                    <div className="durum">Oto Link Connected to OBD</div>
                </div>

                </>: ""}

                {status == 3 ? <> <div className="time">
                    <div className="yuvarlak yuvarlak-koyu"></div>
                    <div className="durum">Oto Link On (Connected to OBD)</div>
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

                {status == 4 ? <> 
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

                {status == 5 ? <> 
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
