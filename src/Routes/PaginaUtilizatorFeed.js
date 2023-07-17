import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './style.css';
import NavbarU from '../Componente/NavbarU.js';
import Salonuser from '../Componente/Salonuser';
import { useEffect } from 'react';


const PaginaUtilizatorFeed=()=>{
    const location=useLocation();
    const[salon,setSalon]=useState([]);

    const navigare=useNavigate();
    


    function paginastart(){
        let rezultat=fetch("http://localhost:5000/saloane",{
             method:'GET',
             headers:{"Content-Type":"application/json"}
         }).then(response=>response.json())
            .then(data=>setSalon(data))         
         
    }
    useEffect(()=>{
        paginastart();
    },[])

    
    var saloane;
    if(salon.length!==0){
        saloane=salon.map((comp)=>(
            <Salonuser comp={comp} key={Math.random()}  prop={location.state}/>
        ))
    }else saloane=null;


    return(
        <>
            <NavbarU comp={location.state}/>
            <div className='feed'>
                {saloane}
            </div>
        </>
    );
}

export default PaginaUtilizatorFeed;