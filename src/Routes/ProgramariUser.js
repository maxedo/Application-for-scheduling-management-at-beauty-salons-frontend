import React,{useEffect, useState} from 'react';
import './style.css';
import NavbarU from '../Componente/NavbarU';
import ProgramareUserVerificate from '../Componente/ProgramariUserverificate';
import { useLocation } from 'react-router-dom';

const ProgramariVizibileUser=()=>{
    const [programari,setProgramari]=useState([]);
    const location=useLocation()

    useEffect(()=>{
        let rezultat=fetch("http://localhost:5000/programareUser",{
                 method:'GET',
                 headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
             }).then(response=>response.json())
                .then(data=>setProgramari(data))
    })


    var prog;
    if(programari.length){
        prog=programari.map((comp)=>(
            <ProgramareUserVerificate comp={comp} />
        ))
    }


    return(
        <>
        <NavbarU comp={location.state}/>
        <div>
        <div className='titluri_programari'>
                <p>Programari acceptate</p>
            </div>
            <div className='parinte'>
                 <div className='programari_inasteptare'>
                {prog}
                
                </div>
            </div>

        </div>
        
        
        
        
        
        
        </>





    )


}


export default ProgramariVizibileUser;



