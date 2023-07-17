import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const Signup=() =>{
    async function inapoi(){
        navigate('/');
    }

    const navigate=useNavigate();
    const [Prenume,setPrenume]=useState("");
    const [Nume_familie,setNumeFamilie]=useState("");
    const [Email,setEmail]=useState("");
    const [DAN,setDAN]=useState("");
    const [Parola_utilizator,setParola]=useState("");
    const [Rol_admin,setRolAdmin]=useState();

    const variantaUser=()=>{
        setRolAdmin(0);
    }
    const variantaAdmin = () => {
        setRolAdmin(1);
      };


    async function inregistrare(){
        let item={Prenume,Nume_familie,Email,DAN,Parola_utilizator,Rol_admin};
        let result=await fetch("http://localhost:5000/signup",{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(item)
        });
        if(result.status===200){
            navigate("/")
        }

    }


    return (
        <>
        <br/>  
        <div className='loginr'>
            <h1>Inregistrare</h1><br/>
            <form className="chestionar">
                <input type="text" id="Prenume" name="Prenume" placeholder="Prenume" onChange={(e)=>setPrenume(e.target.value)} /><br/>
                <input type="text" id="nume_f" name="name_f" placeholder="Nume de familie" onChange={(e)=>setNumeFamilie(e.target.value)} /><br/>
                <input type="text" id="email" name="email" placeholder="Email"  onChange={(e)=>setEmail(e.target.value)} /><br/>
                <input type="text" id="dan" name="dan" placeholder="Data nasterii (AAAA-LL-ZZ)" onChange={(e)=>setDAN(e.target.value)} /><br/>
                <input type="password" id="parola" name="parola" placeholder="Parola" onChange={(e)=>setParola(e.target.value)} /><br/>
                <div className='butoaneradio'>
                <label>
                    <input type="radio" name='rol' value="Utilizator" onChange={variantaUser} />Utilizator
                </label>              
                <label>
                    <input type="radio" name='rol' value="Administrator" onChange={variantaAdmin} />Administrator
                </label>
                </div><br/>
                


                

            </form>
            <button className='login-button' onClick={inregistrare}>Inregistreaza-te</button>
            <button className='butonz' onClick={inapoi}>Inapoi</button>

        </div>
        </>  
    );
};
export default Signup;