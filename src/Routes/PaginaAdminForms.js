import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import './style.css';

const PaginaAdminForms=()=>{
    const [Nume_Salon,setNume]=useState("");
    const [Descriere_Salon,setDescriere]=useState("");
    const [Adresa,setAdresa]=useState();
    const [Program,setProgram]=useState();
    const [Imagine_Coperta,setCoperta]=useState(null);
    const [Nr_Frizeri,setNrFrizeri]=useState();


    const navigare=useNavigate();
    
   



    const fisierschimbare = (event) => {
        setCoperta(event.target.files[0]);
      };
    async function trimitere(){
        const formData = new FormData();
        formData.append('Nume_Salon', Nume_Salon);
        formData.append('Descriere_Salon', Descriere_Salon);
        formData.append("Adresa", Adresa);
        formData.append('Program', Program);
        formData.append('image', Imagine_Coperta);
        formData.append('Nr_frizeri', Nr_Frizeri);
        try{
        let rezultat= await fetch("http://localhost:5000/saloane",{
             method:'POST',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info')},
             body: formData
         })
         if(rezultat.status===200){
            navigare("/AcasaAdmin")
         }
        }catch(err){
            console.log(err);
        }
    }
    


    return(
        <div>

        
        <div className='formsSalon'>
            <h1>Alegeti un nume</h1>
            <input type="text" id="nume" name="Nume" placeholder="Nume" onChange={(e)=>setNume(e.target.value)} />
            <h1>Alegeti o descriere</h1>
            <input type="text" id="Descriere" name="Descriere" placeholder="Descriere" onChange={(e)=>setDescriere(e.target.value)} />
            <h1>Introduceti adresa dorita:</h1>
            <input type="text" id="Adresa" name="Adresa" placeholder="Adresa" onChange={(e)=>setAdresa(e.target.value)} />
            <h1>Inserati un interval zilnic si orar pentru desfasurarea serviciilor</h1>
            <input type="text" id="program" name="Program" placeholder="Program" onChange={(e)=>setProgram(e.target.value)} />
            <h1>Alegeti o imagine de coperta</h1>
            <input type="file" id="imaginea_de_coperta" name="Imaginea_de_coperta" placeholder="Imaginea de coperta" onChange={fisierschimbare} />
            <h1>Inserati numarul de frizeri dorit</h1>
            <input type="text" id="nrFrizeri" name="nrFrizeri" placeholder="Numarul de frizeri" onChange={(e)=>setNrFrizeri(e.target.value)} />
            <button className='Crearebutonsalon' onClick={trimitere}>Confirma</button>
        </div>

        </div>
    )
}

export default PaginaAdminForms;