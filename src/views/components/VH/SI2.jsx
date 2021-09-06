import React from 'react'

function SI({data,title}) {
    return (
        <div className="vd-list mt-4">
            <div className="c-title">{title}</div>
            <ul className="c-list">
                <li>
                    <div className="title">Name: </div>    
                    {data ? <div title={data.desired_lot.name} className="data truncate">
                        {data.desired_lot.name}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Dealer Name: </div>    
                    {data ? <div title={data.dealer.name} className="data truncate">
                        {data.dealer.name}
                        </div> : <div className="skeleton-text"></div>}    
                </li>


                <li>
                    <div className="title">Description: </div>    
                    {data ? <div title={data.desired_lot.description} className="data truncate">
                        {data.desired_lot.description}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Address: </div>    
                    {data ? <div title={data.desired_lot.address} className="data truncate">
                        {data.desired_lot.address}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">State: </div>    
                    {data ? <div title={data.desired_lot.state} className="data truncate">
                        {data.desired_lot.state}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">ZIP: </div>    
                    {data ? <div title={data.desired_lot.zip} className="data truncate">
                        {data.desired_lot.zip}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Radius: </div>    
                    {data ? <div title={data.desired_lot.radius} className="data truncate">
                        {data.desired_lot.radius}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Lat: </div>    
                    {data ? <div title={data.desired_lot.p1_lat} className="data truncate">
                        {data.desired_lot.p1_lat}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Lon: </div>    
                    {data ? <div title={data.desired_lot.p1_lon} className="data truncate">
                        {data.desired_lot.p1_lon}
                        </div> : <div className="skeleton-text"></div>}    
                </li>

             
               


            </ul>
        </div>
    )
}

export default SI
