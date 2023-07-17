import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const PaginaUtilizator=()=>{
    const [status,setStatus]=useState();
    const navigare=useNavigate();


    




    async function paginastart(){
        let rezultat= await fetch("http://localhost:5000/me",{
             method:'GET',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
         })
         setStatus(rezultat.status);
         if(status===200){
             rezultat=await rezultat.json();
             navigare("/AcasaFeed",{state:{nume:rezultat.Nume}});
         }
         else if(status===404){
            navigare("/AcasaPorecla");
         }
    }
    paginastart();
   
    return(
        <>
        <p>Se incarca.......</p>
        </>
    )
    

    // async function porecla(){
    //     const rezultatporecla=await fetch("http://localhost:5000/me",{
    //         method:'POST',
    //         headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
    //         body:JSON.stringify(nume)
    //     })
    //     if(rezultatporecla.status===200)
    //         window.location.reload();
    // }

    // if (rezultatprimire===null)
    //     return(
    //         <>
    //             <div>
    //                 <h1>Alege-ti un nume</h1>
    //                 <input type="text" id="nume" name="Nume" placeholder="Nume" onChange={(e)=>setNume(e.target.value)} />
    //                 <button className='login-button' onClick={porecla}>Confirma</button>
    //             </div>
    //         </>
    //     );
    // else 
    //     return(
    //         <>
    //             <h1>Esti pe o pagina de {rezultatprimire}</h1>
    //         </>
    //     );






}


export default PaginaUtilizator;