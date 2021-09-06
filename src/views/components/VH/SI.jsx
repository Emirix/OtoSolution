import React from 'react'

function SI({data,title}) {
    return (
        <div className="vd-list mt-4">
            <div className="c-title">{title}</div>
            <ul className="c-list">
                <li>
                    <div className="title">Dealer Name: </div>    
                    {data ? <div title={data.dealer.name} className="data truncate">{data.dealer.name}</div> : <div className="skeleton-text"></div>}    
                </li>

                <li>
                    <div className="title">Description</div>    
                    {data ? <div title={data.dealer.description} className="data truncate">{data.dealer.description}</div> : <div className="skeleton-text"></div>}     
                </li>

                <li>
                    <div className="title">Phone: </div>    
                    {data ? <div className="data truncate">{data.dealer.phone}</div> : <div className="skeleton-text"></div>}     
                </li>

                <li>
                    <div className="title">Adress</div>    
                    {data ? <div title={data.dealer.address} className="data truncate">{data.dealer.address}</div> : <div className="skeleton-text"></div>}     
                </li>

                <li>
                    <div className="title">State</div>    
                    {data ? <div title={data.dealer.state} className="data truncate">{data.dealer.state}</div> : <div className="skeleton-text"></div>}     
                </li>

                <li>
                    <div className="title">ZIP</div>    
                    {data ? <div title={data.dealer.zip} className="data truncate">{data.dealer.zip}</div> : <div className="skeleton-text"></div>}     
                </li>


          
                <li>
                    <div className="title">Main Account</div>    
                    {data ? <div title={data.dealer.main_account} className="data truncate">{data.dealer.main_account}</div> : <div className="skeleton-text"></div>}     
                </li>

               


            </ul>
        </div>
    )
}

export default SI
