import React from 'react'
import {useLocation} from "react-router-dom"
function Provider(props) {
    const location = useLocation()
    return (
        <div className={location.pathname.includes("mobile") ? "container  mobil-container p-0" : "page"}>
            {props.children}
        </div>
    )
}

export default Provider
