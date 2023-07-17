import React,{useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './style.css';
import NavbarU from '../Componente/NavbarU.js';
import VizitatorUser from '../Componente/Vizitatoruser';
import { useEffect } from 'react';
import Navbarvizitator from '../Componente/Navbarvizitator';


const Vizitator=()=>{
    const location=useLocation();
    const[salon,setSalon]=useState([]);




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
            <VizitatorUser comp={comp} key={Math.random()} />
        ))
    }else saloane=null;


    return(
        <>
            <Navbarvizitator comp={location.state}/>
            <div className='feed'>
                {saloane}
            </div>
        </>
    );
}

export default Vizitator;