import React, { useEffect } from 'react'
import {useHistory,useParams,Redirect } from "react-router-dom"
function Goto({}) {
    let { to} = useParams();
    let history = useHistory();

    useEffect(()=>{
        history.push(to)
    },[])
    return (
        <Redirect to={"/"+to}></Redirect>
            
        
    )
}

export default Goto
