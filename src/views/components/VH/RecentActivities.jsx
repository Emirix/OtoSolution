import React,{useEffect,useState} from 'react'
import Spinner from "../../components/Spinner/Spinner"

function RecentActivities({data,updateStatus}) {
    const [status,setStatus] = useState(null);
    const [color,setColor] = useState("yuvarlak-yesil")
    const [s0,setS0] = useState(null)

    function timeAgo(input) {
        const date = (input instanceof Date) ? input : new Date(input);
        const formatter = new Intl.RelativeTimeFormat('en');
        const ranges = {
          years: 3600 * 24 * 365,
          months: 3600 * 24 * 30,
          weeks: 3600 * 24 * 7,
          days: 3600 * 24,
          hours: 3600,
          minutes: 60,
          seconds: 1
        };
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;
        for (let key in ranges) {
          if (ranges[key] < Math.abs(secondsElapsed)) {
            const delta = secondsElapsed / ranges[key];
            return formatter.format(Math.round(delta), key);
          }
        }
    }


    useEffect(()=>{
        
        if(data == null){
            return
        }
        console.log(data)
        const _status = data.status;
        const _rpm = data.rpm
        const _speed = data.speed
        const _gps = data.lat
        const _connection = data.connection_type
        const _voltage = data.battery

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
            updateStatus(5)
            if(5 == _status){
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
            _speed == null ||
            _speed == 0 &&
           
            _rpm > 0  &&
            _voltage != null
        ){
            setStatus(4);
            updateStatus(4)

            if(4 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }

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
            updateStatus(0)
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
            setStatus(1);
            updateStatus(1)
            if(1 == _status){
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
            updateStatus(2)
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
            _speed == null ||
            _rpm == 0  &&
            _voltage != null
        ){
            setStatus(3);
            updateStatus(3)
            if(3 == _status){
                setColor("yuvarlak-yesil")
            }else{
                setColor("yuvarlak-sari")
            }
        }


    },[data])

    var months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
      };
    return (
        <div className="r-a ">
            <div className="c-title">Status Information</div>
            <div className="r-a__caption">Last Connected: {data != null ? months[data.last_connection_time.substring(5, 7)] + " " + data.last_connection_time.substring(8, 10) + " " +  data.last_connection_time.substring(0, 4) + " " + data.last_connection_time.substring(11,16) + " ("+timeAgo(data.last_connection_time) +")  " : "No Data"}</div>
            {data != null ? 
            <div className="timelist">

{status == 0 || status == null ? <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link Power Off</div>
                </div> : ""}

                {status == 1 ? <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link On (Not Connected to OBD)</div>
                </div> : ""}

                {status ==2 ? <> <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link On</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link Connected to OBD</div>
                </div>

                </>: ""}

                {status == 3 ? <> <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Oto Link On (Connected to OBD)</div>
                </div>
                <div className="time-cubuk"></div>

                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Ignition On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Engine Off</div>
                </div>

                </>: ""}

                {status == 4 ? <> 
                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Engine On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Car Stationary</div>
                </div>

                </>: ""}

                {status == 5 ? <> 
                <div className="time">
                    <div className={"yuvarlak " + color}></div>
                    <div className="durum">Engine On</div>
                </div>

                <div className="time-cubuk"></div>

                <div className="time">
                    <div className={"yuvarlak " + color}></div>
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
