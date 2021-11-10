import React from 'react'

function DataInfo({data,title}) {
    return (
        <div className="data-with-title">
                        <div className="title">{title}</div>

            <div className="data">{data}</div>
        </div>
    )
}

export default DataInfo
