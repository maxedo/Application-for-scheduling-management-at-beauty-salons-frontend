import React,{useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import "../Routes/style.css";
import 'font-awesome/css/font-awesome.min.css';

const NavbarU=(comp)=>{
    const navigare=useNavigate();
    const [nume,setNume]=useState("");


    function delogare(){
        navigare('/');
        localStorage.clear();
    }
    
    async function cautaresalon(){
        if(nume!==""){
            let rezultat=await fetch(`http://localhost:5000/saloanecautare/${nume}`,{
                 method:'GET',
                 headers:{"Content-Type":"application/json"},
              })
            rezultat=await rezultat.json();
            navigare("/Saloane_Cautate",{state:{nume:comp.comp.nume,
                                                saloane:rezultat}})
        }


    }
    function spre(){
        navigare("/VerificareProg",{state:{nume:comp.comp.nume}})
    }

    return(
        
        <ul className='navbar'>
            <Link to='/Acasa'  className="navbarlogo">EBeauty</Link>
            <div className='container_cautare'>
                <input onChange={(e)=>setNume(e.target.value)}  type="text" placeholder="Cautare.."></input>
                <button onClick={cautaresalon} type="submit"><i className="fa fa-search"></i></button>
            </div>
            <button onClick={spre} className='navbarlink3'>Programari acceptate</button>
            <div className='navsfarsit'>
            <h1>{comp.comp.nume}</h1>
            <button  className='butonnav' onClick={delogare}>Deconecteaza-te</button>
            </div>
        </ul>
        
    );
}

export default NavbarU;
