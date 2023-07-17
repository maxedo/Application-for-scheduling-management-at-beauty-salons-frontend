import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './style.css';
import NavbarU from '../Componente/NavbarU.js';
import Salonuser from '../Componente/Salonuser';
import { useEffect } from 'react';



const Saloane_cautate=()=>{
    const location=useLocation();
    console.log(location.state.saloane)
    const navigare=useNavigate();

    

    var saloane;
    if(location.state.saloane.length!==0){
        saloane=location.state.saloane.map((comp)=>(
            <Salonuser comp={comp} key={Math.random()}  prop={location.state}/>
        ))
    }else saloane=<h1>Nu a fost gasit niciun salon</h1>;
    return(
        <>
            <NavbarU comp={location.state}/>
            <div className='feed'>
                {saloane}
            </div>
        </>
    )
}

export default Saloane_cautate;