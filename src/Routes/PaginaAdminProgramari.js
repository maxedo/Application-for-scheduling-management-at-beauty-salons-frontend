import React from 'react';
import NavbarAdmin from '../Componente/NavbarAdmin';
import Programa from '../Componente/Programare_noua';
import Programaacc from '../Componente/Programare_acceptata';
import './style.css';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaAdminProgramari=()=>{

    const navigare=useNavigate();
    
    


    const [programari,setProgramari]=useState([]);
    const [programariacceptate,setAccept]=useState([])
    useEffect(()=>{
        let rezultat=fetch("http://localhost:5000/programare",{
                 method:'GET',
                 headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
             }).then(response=>response.json())
                .then(data=>setProgramari(data))
        

        let rezultat2=fetch("http://localhost:5000/programareacceptate",{
            method:'GET',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
        }).then(response=>response.json())
        .then(data=>setAccept(data))
    },[])


    

    var programarinoi;
    if(programari.length){
        programarinoi=programari.map((comp)=>(
            <Programa comp={comp} />
        ))
    }

    var programariacc;
    if(programariacceptate.length){
        programariacc=programariacceptate.map((comp)=>(
            <Programaacc comp={comp} />
        ))
    }
    console.log(programariacceptate)
    return(<>
        <NavbarAdmin/>
        <div>
            <div className='titluri_programari'>
                <p>Programari in asteptare</p>

                <p>Programari acceptate</p>
            </div>
        <div className='parinte'>
            <div className='programari_inasteptare'>
                {programarinoi}
                
            </div>
            <div className='line'></div>
                <div className='programari_acceptate'>
                     {programariacc} 
                </div>
            </div>   
        </div>
        </>
    )

}


export default PaginaAdminProgramari;