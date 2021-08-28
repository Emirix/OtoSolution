import axios from 'axios'
import React,{useEffect,useState} from 'react'

function Login() {
   const [statusLogin,setSL] = useState("Giriş Yapılıyor")
    useEffect(()=>{

      axios.post("/api/account/login/",{
          
    "email": "test@test.com",
    "password": "q1"

      }).then(res=>{
        console.log(res)
        localStorage.setItem("key",res.data.key)
        setSL("Demo Kullanıcısı ile giriş yapıldı")
      }).then(()=>{
        axios.get("/api/account/user/",{
          headers:{
            "Authorization" : `Token ${localStorage.getItem("key")}`
        }
        }).then(user=>{
          console.log(user)
          localStorage.setItem("dealer_id",user.data.dealer.id)
        }).catch(err=>{
          setSL("Hata")
        })
      })
       
    },[])
    return (
        <div className="">
            <h5>{statusLogin}</h5>
        </div>
    )
}

export default Login
