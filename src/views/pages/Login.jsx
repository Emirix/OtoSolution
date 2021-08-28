import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { Redirect } from 'react-router-dom';
import Logo from "../../assets/svg/logo.svg";

function Login() {
   const [hata,setHata] = useState("")
   const [user,setUser] = useState("");
   const [pass,setPass] = useState("");


    function log(e){
      e.preventDefault()
      axios.post("/api/account/login/",{
          
    "email": user,
    "password": pass

      }).then(res=>{
        console.log(res)
        localStorage.setItem("key",res.data.key)
        
      }).then(()=>{
        axios.get("/api/account/user/",{
          headers:{
            "Authorization" : `Token ${localStorage.getItem("key")}`
        }
        }).then(user=>{
          console.log(user)
          localStorage.setItem("dealer_id",user.data.dealer.id)
         
         window.location="/"
         
        })
      }).catch(err=>{
        setHata("Hata")
        setUser("")
        setPass("")
      })
       
    }

    return (
        <div className="login-page">
            <div className="login-box">
              <img src={Logo} alt="oto solutions logo" />
              <form onSubmit={e=>log(e)}>
                <div className="form-group">
                  <label htmlFor="">User</label>
                  <input type="text" required className="form-control" value={user} onChange={e=>setUser(e.target.value)} />
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="">Password</label>
                  <input type="password" required className="form-control" value={pass} onChange={e=>setPass(e.target.value)} />
                </div>

                <button className="btn btn-primary mt-3 mx-auto d-block w-50">Login</button>
              </form>
              <div className="text-danger text-center">{hata}</div>
            </div>
           
        </div>
    )
}

export default Login
