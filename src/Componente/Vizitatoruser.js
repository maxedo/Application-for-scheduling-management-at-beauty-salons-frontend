import React,{useState} from 'react'
import "../Routes/style.css";
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import Serviciiuser from './ServiciiUser';
const VizitatorUser=(comp)=>{
    const [open, setOpen]=useState(false);
    const [serviciiup,setServicii]=useState([]);
    const [date, setDate] = useState(null);
    
    
    
    function getServicii(){
        let rezultat=fetch(`http://localhost:5000/servicii/${comp.comp.IdSalon}`,{
             method:'GET',
             headers:{"Content-Type":"application/json"},
          }).then(response=>response.json())
          .then(data=>setServicii(data))
    }

    const handleClose = () => {
        setOpen(false);
        
    };
 


    
    const handleOpen = () => {
        setOpen(true);
        getServicii();
          
    };

    useEffect(()=>{
        if(serviciiup.length){
            const newdate=serviciiup.map((comp)=>(
                <Serviciiuser comp={comp} key={Math.random()}/>
            ))
            setDate(newdate);
            }else{
                const newdate=<p>Acest salon nu are servicii disponibile</p>
                setDate(newdate)
            } 
                
    },[serviciiup])

    return(
        <div key={comp.comp.IdSalon}>
        <div className='salonFeed' onClick={handleOpen}>
            <div>
                <img className='imaginefeed' src={'http://localhost:5000/poze/'+comp.comp.Imagine_Coperta+''} alt='poza-salon'  />
            </div>
            <div className='descriere'>
                <h1 >{comp.comp.Nume_salon}</h1>
                <p>{comp.comp.Adresa}</p>
            </div>
            <h1>Descriere:</h1>
            <p>{comp.comp.Descriere_Salon}</p>
            <h1>Program:</h1>
            <p>{comp.comp.Program}</p>
            <h1>Numarul de frizeri:{comp.comp.Nr_frizeri}</h1>

        </div>
        

        
        <Modal
                onClose={handleClose}
                open={open}
                style={{
                    height:'100%',
                    width: '100%',
                    overflowY:'scroll',
                    marginLeft:"36%",
                    
                }}
            >
        <div className='salonFeed2'>
            <div>
                <img className='imaginefeed2' src={'http://localhost:5000/poze/'+comp.comp.Imagine_Coperta+''} alt='poza-salon'  />
            </div>
            <div className='descriere'>
                <h1 >{comp.comp.Nume_salon}</h1>
                <p>{comp.comp.Adresa}</p>
            </div>
            <h1>Descriere:</h1>
            <p>{comp.comp.Descriere_Salon}</p>
            <h1>Program:</h1>
            <p>{comp.comp.Program}</p>
            <h1>Numarul de frizeri:{comp.comp.Nr_frizeri}</h1>
            <div>
            </div>
            <h1>Servicii:</h1>
            <div className='serviciifeed'>
                {date}
            </div>
        </div>
            </Modal>
        </div>
    )
}

export default VizitatorUser;