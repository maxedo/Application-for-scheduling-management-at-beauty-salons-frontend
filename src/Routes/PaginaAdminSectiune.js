import React,{useEffect, useState} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import './style.css';
import NavbarAdmin from '../Componente/NavbarAdmin';
import Serviciu from '../Componente/Serviciu';


const PaginaAdminSectiune=()=>{

    const navigare=useNavigate();
    
   

    const locatie=useLocation();
    const [Nume_Salon,setNume]=useState(locatie.state.rezultat.Nume_salon);
    const [Descriere_Salon,setDescriere]=useState(locatie.state.rezultat.Descriere_Salon);
    const [Adresa,setAdresa]=useState(locatie.state.rezultat.Adresa);
    const [Program,setProgram]=useState(locatie.state.rezultat.Program);
    const [Nr_frizeri,setNr_frizeri]=useState(locatie.state.rezultat.Nr_frizeri);
    

    const [Denumire,SetDenumire]=useState();
    const [Pret,setPret]=useState();
    const [start,setStart]=useState();
    const [final,setFinal]=useState();
    const [ProgramServici,setProgramServici]=useState();
    const [afisat,setAfisare]=useState(false);
    const [Durata,setDurata]=useState();

    const [componentaServicii,setComponenta]=useState({
        loading: false,
        data: null,
        error: false
    });
    

    
    const[update,setUpdate]=useState(1);
    



    let formularServicii;
    if(afisat===true){
        formularServicii=<div>
        <input type='text' placeholder='Denumire'  onChange={(e)=>SetDenumire(e.target.value)}/>
        <p>Pret</p>
        <input type='number' min='0' placeholder='Pret' onChange={(e)=>setPret(e.target.value)}/>
        <p className='titlusimplu'>Alegeti programul dorit</p>
        <p>Inceperea orarului are loc la ora:</p>
        <input type='number' min='0' max='24'  onChange={(e)=>setStart(e.target.value)}/>
        <p>Se termina la ora:</p>
        <input type='number' min='0' max='24' onChange={(e)=>setFinal(e.target.value)}/>
        <p>Introduceti durata serviciului in minute:</p>
        <input type='number' min='0' max='60' onChange={(e)=>setDurata(e.target.value)}/><br/>
        <button className='butondesalon' onClick={postare_servicii}>Confirma</button>
    </div>
    }



    useEffect(()=>{
        fetch("http://localhost:5000/serviciiAdmin",{
                 method:'GET',
                 headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
             }).then(response=>response.json())
             .then(data=>{
                setComponenta({ 
                    loading: false,
                    data:data,
                    error: false})
                    
             })
        setProgramServici(start+"-"+final);
    },[start,final,setComponenta])




    let content;
    if(componentaServicii.data){
        content=componentaServicii.data.map((comp)=>
            <Serviciu comp={comp} key={Math.random()}/>
        )
    }



    function postare_servicii(){
        let Program=ProgramServici
        const obiect={Denumire,Pret,Program,Durata}
        console.log(obiect)
        let rezultat=fetch("http://localhost:5000/servicii",{
             method:'POST',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
             body:JSON.stringify(obiect)
         })
    }

  






    const [dezactivare,setDezactivare]=useState(true);
    const [buton,setButon]=useState("Editare");
    




    async function schimbare_buton(){
        if(buton==="Editare"){
            setDezactivare(false)
            setButon("Salvare")
        }
        if(buton==="Salvare"){
            let sectiune={Nume_Salon,Descriere_Salon,Adresa,Program,Nr_frizeri};
            try{
            var rezultat= await fetch("http://localhost:5000/saloane",{
             method:'PUT',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
             body:JSON.stringify(sectiune)
         });
         if(rezultat.status===200){
            navigare("/AcasaAdmin")
        }
        }catch(e){
            console.log(e);
        }
            
        }

    }





    return(
        <>
        <NavbarAdmin/>
        <div>
            <div className='sectiune_admin'>
            <div className='salon'>
            <img className='imaginesectiunesalon' src={'http://localhost:5000/poze/'+locatie.state.rezultat.Imagine_Coperta+''} alt='poza-profil'  />  
            <h1>Nume:</h1>
            <input disabled={dezactivare} type='text' defaultValue={locatie.state.rezultat.Nume_salon} onChange={(e)=>setNume(e.target.value)}/>
            <h1>Descriere:</h1>
            <input disabled={dezactivare} type='text' defaultValue={locatie.state.rezultat.Descriere_Salon} onChange={(e)=>setDescriere(e.target.value)}/>
            <h1>Adresa:</h1>
            <input disabled={dezactivare} type='text' defaultValue={locatie.state.rezultat.Adresa} onChange={(e)=>setAdresa(e.target.value)}/>   
                <div className='rightsite'>
                    <h1>Program:</h1>
                    <input disabled={dezactivare} type='text' defaultValue={locatie.state.rezultat.Program} onChange={(e)=>setProgram(e.target.value)}/>
                    <h1>Frizeri :</h1>
                    <input disabled={dezactivare} type='number' defaultValue={locatie.state.rezultat.Nr_frizeri}  onChange={(e)=>setNr_frizeri(e.target.value)}/><br/>
                    <button className='butondesalon' onClick={schimbare_buton}>{buton}</button>

            </div>
        </div>
        
            
        <div className='servicii'>
            <p className='titlubuton'>Adauga un serviciu</p>
            <button onClick={()=>setAfisare(!afisat)}>+</button>
            {formularServicii}
        </div>
        {content}
            </div>
        </div>
        
        </>
    )
//
}

export default PaginaAdminSectiune;