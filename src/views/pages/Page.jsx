import React,{useEffect} from 'react'

function Page(props) {
    useEffect(()=>{
        window.scrollTo({
            top:0,
            left:0,
            behavior:"auto",

        })
    },[])
    return (
        <div>
            {props.children}
        </div>
    )
}

export default Page
