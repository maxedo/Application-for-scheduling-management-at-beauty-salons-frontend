import React from 'react';


const ProgramareSalonclient=(comp)=>{
    var datanoua=comp.comp.DataProgramare.slice(0, 10);
    var format1=datanoua.split("-");
    var format2=format1[2]+"/"+format1[1]+"/"+format1[0]

    return(
        <div className='oprogramare'>
                    {/* <div className='optiuniprogramare'>
                    </div> */}
                        <p>Data: {format2}</p>
                        <p>Ora: {comp.comp.Ora}</p>
                        <p>Servici: {comp.comp.Denumire}</p>
                        
        </div>
        )

}

export default ProgramareSalonclient;