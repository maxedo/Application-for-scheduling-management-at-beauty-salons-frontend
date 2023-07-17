import React,{useState} from 'react';
import "../Routes/style.css";
import moment from 'moment';



const Recenzii=(comp)=>{
    const [vedere,setVedere]=useState(true);

    var datapostare=moment(comp.comp.Data_postarii.slice(0,10));
    var nouadata=datapostare.format("DD/MM/YYYY");

    //console.log(comp.prop.nume)
    function stergererencezie(){
        let rezultat=fetch(`http://localhost:5000/recenzie/${comp.comp.IdRecenzie}`,{
            method:'DELETE',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"}
         })
         setVedere(false)
    }

    if(vedere===true)
    return(
        <div className='recenziifeed'  >
            <div className="comment-content">
                 
            <div className='detaliirecenzie'>
                <span key={Math.random()} className="commenter-name">{comp.comp.Nume}</span>
                <span key={Math.random()} className="comment-timestamp">{nouadata}</span>
                {comp.prop.nume===comp.comp.Nume && 
            <button className='butonstergererecenzie' onClick={stergererencezie}>X</button> }
            <div className='stars'>
            {[...Array(comp.comp.Rating)].map((star, index) => {
                    return (
            <span key={Math.random()} className="star">&#9733;</span>
        );
      })}
            </div>
            </div>
            <p className="comment-text">{comp.comp.Continut}</p>
            
            </div>
        </div>
    )
}

export default Recenzii;


