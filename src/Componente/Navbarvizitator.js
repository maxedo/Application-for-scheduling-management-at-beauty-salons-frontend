import React from 'react';
import {useNavigate} from 'react-router-dom';
import "../Routes/style.css";
import 'font-awesome/css/font-awesome.min.css';

const Navbarvizitator=(comp)=>{
    const navigare=useNavigate();
    function delogare(){
        navigare('/');
        localStorage.clear();
    }
    return(
        
        <ul className='navbar'>
            <h1 className="navbarlogo">EBeauty</h1>
            <div className='container_cautare'>
                <input  type="text" placeholder="Cautare.."></input>
                <button type="submit"><i className="fa fa-search"></i></button>
            </div>
            <div className='navsfarsit'>
            </div>
        </ul>
        
    );
}

export default Navbarvizitator;
