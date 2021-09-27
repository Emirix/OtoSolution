import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";

function RecentActivities({ status, data, perde }) {
  const [color, setColor] = useState(
    !perde ? "yuvarlak-sari" : "yuvarlak-yesil"
  );
  const [s0, setS0] = useState(null);

  function timeAgo(input) {
    const date = input instanceof Date ? input : new Date(input);
    const formatter = new Intl.RelativeTimeFormat("en");
    const ranges = {
      years: 3600 * 24 * 365,
      months: 3600 * 24 * 30,
      weeks: 3600 * 24 * 7,
      days: 3600 * 24,
      hours: 3600,
      minutes: 60,
      seconds: 1,
    };
    const secondsElapsed = (date.getTime() - Date.now()) / 1000;
    for (let key in ranges) {
      if (ranges[key] < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / ranges[key];
        return formatter.format(Math.round(delta), key);
      }
    }
  }

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
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  return (
    <div className="r-a ">
      <div className="c-title">Status Information</div>
      <div className="r-a__caption">
        Last Connected:{" "}
        {data != null && data.last_connection_time != null
          ? months[data.last_connection_time.substring(5, 7)] +
            " " +
            data.last_connection_time.substring(8, 10) +
            ", " +
            data.last_connection_time.substring(0, 4) +
            " " +
            new Date(data.last_connection_time).toString().substring(15,21)+
           
            " (" +
            timeAgo(data.last_connection_time) +
            ")  "
          : "No Data"}
      </div>
      {data != null ? (
        <div className="timelist">
          {status == 0 || status == null ? (
            <div className="time">
              <div className={"yuvarlak " + color}></div>
              <div className="durum">Oto Link Power Off</div>
            </div>
          ) : (
            ""
          )}

          {status == 1 ? (
            <div className="time">
              <div className={"yuvarlak " + color}></div>
              <div className="durum">Oto Link On (Not Connected to OBD)</div>
            </div>
          ) : (
            ""
          )}

          {status == 2 ? (
            <>
              {" "}
              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Oto Link On</div>
              </div>
              <div className="time-cubuk"></div>
              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Oto Link Connected to OBD</div>
              </div>
            </>
          ) : (
            ""
          )}

          {status == 3 ? (
            <>
              {" "}
              <div className="time">
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
            </>
          ) : (
            ""
          )}

          {status == 4 ? (
            <>
              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Engine On</div>
              </div>

              <div className="time-cubuk"></div>

              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Car Stationary</div>
              </div>
            </>
          ) : (
            ""
          )}

          {status == 5 ? (
            <>
              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Engine On</div>
              </div>

              <div className="time-cubuk"></div>

              <div className="time">
                <div className={"yuvarlak " + color}></div>
                <div className="durum">Car Moving</div>
              </div>
            </>
          ) : (
            ""
          )}

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
      ) : (
        <div className="mt-3 mb-2 d-flex justify-content-center ">
          <Spinner size={35} />
        </div>
      )}
    </div>
  );
}

export default RecentActivities;
