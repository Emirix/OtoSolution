import React from 'react'

function Bildirim({name,vkn,status,location,minute}) {
    return (
        <div className="bildirim">
            <div className="left-en">
                <div className="name">{name}</div>
                <div className="vkn">{vkn}</div>
                <div className="location">{location}</div>
            </div>
            <div className="orta">
                <div className={"status status-"+status}>{status}</div>
            </div>
            <div className="right-en">
                <div className="minute">{minute}m</div>
            </div>
            <div className="en-sag">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5 1.5L1.5 10.5M1.5 1.5L10.5 10.5" stroke="#ACACAC" strokeWidth="2"/>
</svg>

            </div>
        </div>
    )
}

export default Bildirim
