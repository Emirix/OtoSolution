import React from 'react'

function DataProgress({title,color,value,className}) {
    return (
        <div className={"data-progress " + className}>
            <div className="title">{title}</div>
            <div className={"data-probar data-probar-"+color}>
                <div className={"cubuk"} style={{width:value+"%"}}></div>
            </div>
        </div>
    )
}

export default DataProgress
