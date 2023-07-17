import React,{useState} from 'react';


const Programa=(comp)=>{
    

    function confirmare(){
        var rezultat=fetch(`http://localhost:5000/programare/${comp.comp.Id_Programare}`,{
             method:'PUT',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
         });
         window.location.reload(false);
    }

    
    function stergere(){
        var rezultat=fetch(`http://localhost:5000/programare/${comp.comp.Id_Programare}`,{
             method:'DELETE',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
         });
         window.location.reload(false);
    }


    console.log(comp.comp.DataProgramare)
    var datanoua=comp.comp.DataProgramare.slice(0, 10);
    var format1=datanoua.split("-");
    var format2=format1[2]+"/"+format1[1]+"/"+format1[0]
    return(
    <div className='oprogramare'>
                <div className='optiuniprogramare'>
                        <button onClick={stergere} className='deleteprogramare'>X</button>
                        <button onClick={confirmare} className='acceptprogramare'>✓</button>
                </div>
                    <p>Client: {comp.comp.Nume}</p>
                    <p>Data: {format2}</p>
                    <p>Ora: {comp.comp.Ora}</p>
                    <p>Servici: {comp.comp.Denumire}</p>
                    
    </div>
    )
}

export default Programa;