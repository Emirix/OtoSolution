import React from 'react'

function OtoLinkC({desc,img,validImg}) {
    return (
        <div className="link-container br-12">
            <img src={img} alt={desc} />
            <div className="ms-3">
                <div className="link-container-desc">
                    Enter the <b>{desc}</b> number on the car
                    </div>
                    <input type="text" placeholder={desc} />
                
            </div>
        </div>
    )
}

export default OtoLinkC
