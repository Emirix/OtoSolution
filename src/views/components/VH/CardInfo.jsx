import React from 'react'

function CardInfo() {
    return (
        <div className="c-a mt-3 p-0">
            <div className="c-title p-2">Card Info</div>
            <ul className="c-list p-2">
            <li>
                    <div className="title">Serial ID</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Card Version</div>    
                    <div className="data">v1.2</div>    
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
    )
}

export default CardInfo
