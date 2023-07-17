import React,{useState} from 'react'
import { useEffect } from 'react';
import Modal from '@material-ui/core/Modal';




const Serviciu=(comp)=>{
    const [pornit,setPornire]=useState(true)
    const [buton,setButon]=useState("Editeaza")
    const [open, setOpen]=useState(false);


    let programSplit=comp.comp.Program.split("-")

    const [DenumirePUT,SetDenumire]=useState(comp.comp.Denumire);
    const [PretPUT,setPret]=useState(comp.comp.Pret);
    const [start,setStart]=useState(programSplit[0]);
    const [final,setFinal]=useState(programSplit[1]);
    const [ProgramPUT,setProgramServici]=useState();
    const [Durata,setDurata]=useState(comp.comp.Durata);
    
 
    const handleClose = () => {
        setOpen(false);
    };
 
    const handleOpen = () => {
        console.log("apare")
        setOpen(true);
    };
    useEffect(()=>{
        setProgramServici(start+"-"+final)
    },[start,final,setProgramServici])





     function stergere_servicii(serviciuId){
        console.log("merge")
        let rezultat=fetch(`http://localhost:5000/servicii/${serviciuId}`,{
             method:'DELETE',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
         })
         window.location.reload(false);
    }




    async function editare(serviciu){
        if(buton==="Editeaza"){
            setPornire(false);
            setButon("Salveaza");
        }
        else if(buton==="Salveaza"){
            var sectiune={DenumirePUT,PretPUT,ProgramPUT,Durata}
            console.log(sectiune)
            var rezultat= await fetch(`http://localhost:5000/servicii/${serviciu}`,{
             method:'PUT',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
             body:JSON.stringify(sectiune)
         });
            setPornire(true);
            setButon("Editeaza");
            window.location.reload(false);
        }
    }

    




    return(
    <div>
    
        <div className='serviciu' key={comp.comp.IdServiciu} onClick={handleOpen}>
                <p>Denumire: {comp.comp.Denumire}</p>
                <p>Program: {comp.comp.Program}</p>
                <p>Pret: {comp.comp.Pret} RON</p>
                <p>Durata: {comp.comp.Durata} Minute</p>
        </div>
               <button className='buton-serviciu' onClick={()=>stergere_servicii(comp.comp.IdServiciu)}>X</button>
        
            
           
            <Modal
                onClose={handleClose}
                open={open}
                style={{
                    //position: 'absolute',
                    backgroundColor: '#3afd00',
                    border:'2px solid black',
                    height: '60%',
                    width: '20%',
                    marginLeft:"36%",
                    marginTop:"10%"
                }}
            >
            <div className='Modala'>
                <p>Denumire:</p>
                <input disabled={pornit} defaultValue={comp.comp.Denumire} onChange={(e)=>SetDenumire(e.target.value)}/>
                <p>Pret:</p>
                <input type='number' disabled={pornit} defaultValue={comp.comp.Pret} onChange={(e)=>setPret(e.target.value)}/>
                <p>Inceputul servirii in program:</p>
                <input type='number' disabled={pornit} defaultValue={programSplit[0]} placeholder='Inceputul servirii in program' onChange={(e)=>setStart(e.target.value)}/>
                <p>Sfarsitul servirii in program:</p>
                <input type='number' disabled={pornit} defaultValue={programSplit[1]} placeholder='Finalul servirii in program' onChange={(e)=>setFinal(e.target.value)}/><br/>
                <p>Durata (in minute)</p>
                <input type='number' disabled={pornit} defaultValue={comp.comp.Durata} onChange={(e)=>setDurata(e.target.value)}/>
                <button onClick={()=>editare(comp.comp.IdServiciu)}>{buton}</button>
            </div>
            </Modal>
    </div>
    )
}
export default Serviciu;

