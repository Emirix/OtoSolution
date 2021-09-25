import React from "react";

function CardInfo({ data }) {
  const months = {
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
    <div className="c-a mt-3 p-0">
      <div className="c-title p-2">Card Status</div>
      <ul className="c-list p-2">
        <li>
          <div className="title">Serial ID</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device_serial_no}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>

        <li>
          <div className="title">Card Version</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device.version}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>

        <li>
          <div className="title">Model</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device.model}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>

        <li>
          <div className="title">Manufacture Date</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device.manufacture_date ? data.device.manufacture_date.substring(0,10).replaceAll("-","/") : ""}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>


        <li>
          <div className="title">Created At</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device.created_at ? data.device.created_at.substring(0,10).replaceAll("-","/") : ""}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>

        <li>
          <div className="title">Updated At</div>
          {data != null || data != undefined ? (
            <div className="data">{data.device.updated_at ? data.device.updated_at.substring(0,10).replaceAll("-","/") :""}</div>
          ) : (
            <div className="skeleton-text w-50"> </div>
          )}
        </li>
      </ul>

      <div className="c-a-bottom p-2">
        <div className="c-a-bottom__header d-flex align-items-center justify-content-between ">
          <div className="c-title">Card Status</div>
          <div className="c-title">Last Connected</div>
        </div>
        <ul className="c-list">
          <li>
            <div className="title">{data.device.serial_no}</div>
            {data.connection_type == 1 ? <div className="durum durum-yesil">Wired</div> : ""}
            {data.connection_type == 2 ? <div className="durum durum-yesil">Wireless</div> : ""}
            {data.connection_type == null ? <div className="durum durum-gri">Disconnected</div> : ""}
           
            <div className="data">
            
            {data != null && data.last_connection_time != null ? months[data.last_connection_time.substring(5, 7)] + " " + data.last_connection_time.substring(8, 10) + " " +  data.last_connection_time.substring(0, 4) + " " + new Date(data.last_connection_time).toString().substring(15,21) : " No Data"}</div>
          </li>


          
        </ul>
      </div>
    </div>
  );
}

export default CardInfo;
