import React from 'react'

function BA({src,sayi,caption}) {
    return (
        <div className="ba ">
            <img src={src} alt="" />
            <div className="ms-3">
                <div className="ba__title">{sayi}</div>
                <div className="ba__bottom">{caption}</div>
            </div>
        </div>
    )
}

export default BA
