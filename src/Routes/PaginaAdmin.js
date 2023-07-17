import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const PaginaAdmin=()=>{

    const navigare=useNavigate();

  



    const [status,setStatus]=useState();
    async function paginastart(){
        let rezultat= await fetch("http://localhost:5000/saloaneAdmin",{
             method:'GET',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
         });
         setStatus(rezultat.status)
         if(status===200){
            rezultat=await rezultat.json();
            navigare("/PaginaAdminSectiune",{state:{rezultat:rezultat}});
         }else if(status===404){
            navigare("/PaginaAdminForms");
        }
        //else if(status===408){
        //     localStorage.clear();
        //     navigare("/");
        //  }

    }
    paginastart();



    return(
            <h1>Se incarca.....</h1>
    );

}


export default PaginaAdmin;