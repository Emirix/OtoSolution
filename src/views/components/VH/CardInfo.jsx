import React from 'react'

function CardInfo() {
    return (
        <div className="c-a mt-3">
            <div className="c-title">Card Info</div>
            <ul className="c-list">
            <li>
                    <div className="title">Serial ID</div>    
                    <div className="data">123123</div>    
                </li>

                <li>
                    <div className="title">Card Version</div>    
                    <div className="data">v1.2</div>    
                </li>
            </ul>
        </div>
    )
}

export default CardInfo
