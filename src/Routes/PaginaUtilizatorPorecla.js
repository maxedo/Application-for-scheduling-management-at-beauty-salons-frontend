import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const PaginaUtilizatorPorecla=()=>{
    const[Nume,setNume]=useState("");


    const navigare=useNavigate();
    
   

    async function porecla(){
        const obiect={Nume}
        const rezultatporecla=await fetch("http://localhost:5000/me",{
            method:'POST',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
            body:JSON.stringify(obiect)
        })
        if(rezultatporecla.status===200)
            navigare("/Acasa")
    }
    
    return(
            <div className='porelcaformular'>
                <h1>Alegeti-va o porecla</h1>
                <input type="text" id="nume" name="Nume" placeholder="Nume" onChange={(e)=>setNume(e.target.value)} />
                <button className='poreclabuton' onClick={porecla}>Confirma</button>
            </div>
            );
}

export default PaginaUtilizatorPorecla;