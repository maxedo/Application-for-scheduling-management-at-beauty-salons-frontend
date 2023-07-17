import React from 'react';



const Serviciiuser=(comp)=>{

    return(
        <div className='serviciiuser' >
            <p>Nume: {comp.comp.Denumire}</p>
            <p>Pret: {comp.comp.Pret} RON</p>
            <p>Programul zilnic: {comp.comp.Program}</p>
            <p>Durata:{comp.comp.Durata} Minute</p>
        </div>
    )

}


export default Serviciiuser;