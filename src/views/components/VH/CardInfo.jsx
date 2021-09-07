import React from "react";

function CardInfo({ data }) {
  
  return (
    <div className="c-a mt-3 p-0">
      <div className="c-title p-2">Card Info</div>
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
          <div className="c-title">Card List</div>
          <div className="c-title">Last Connected</div>
        </div>
        <ul className="c-list">
          <li>
            <div className="title">23456234</div>
            <div className="durum durum-yesil">Online</div>
            <div className="data">23456234</div>
          </li>

          <li>
            <div className="title">23456234</div>
            <div className="durum durum-gri">Removed</div>
            <div className="data">23456234</div>
          </li>

          <li>
            <div className="title">23456234</div>
            <div className="durum durum-gri">23456234</div>
            <div className="data">23456234</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CardInfo;
