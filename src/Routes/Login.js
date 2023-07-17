import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const Login=() =>{
    const [Email,setEmail]=useState("");
    const [Parola_utilizator,setParola]=useState("");
    const navigate=useNavigate();
   
    
    async function login(){
        let item={Email,Parola_utilizator};
        let result=await fetch("http://localhost:5000/login",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(item)
        });

        if(result.status===200){
            result=await result.json();
            localStorage.setItem("user-info",result.token);
            if(localStorage.getItem('user-info') && result.token!==undefined && result.rol_utilizator===0){
                navigate("/Acasa");
            }
            
            if(localStorage.getItem('user-info') && result.token!==undefined && result.rol_utilizator===1){
                navigate("/AcasaAdmin");
            }

    }
}
    async function tranzitie(){
        navigate("/signup")
    }






    return (
        <>
        <h1 className='logo'>E-Beauty</h1>
        <div className='login'>
            <h1>Autentificare</h1><br/>
            <form className="chestionar">
                <input type="text" id="email" name="Email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br/>
                <input type="password" id="password" name="Parola" placeholder="Parola" onChange={(e)=>setParola(e.target.value)} /><br/>
            </form>
            <button className='login-button' onClick={login}>Autentifica-te</button>
            <button className='butonz' onClick={tranzitie} >Inregistreaza-te</button>
            
            

        </div>
        </>  
    );
};
export default Login;
