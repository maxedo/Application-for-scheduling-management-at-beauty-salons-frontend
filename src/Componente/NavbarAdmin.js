import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';

const NavbarAdmin=()=>{
    const navigare=useNavigate();
    function delogare(){
        navigare('/');
        localStorage.clear();
    }
    return(
    <ul className='navbar'>
        <h1 className="navbarlogo">EBeauty</h1>
        <div className='linkuri'>
        <Link className='navbarlink' to='/AcasaAdmin'>Acasa</Link>
        <Link className='navbarlink' to='/PaginaAdminProgramari'>Programari</Link>
        </div>
        <div className='navadmin'>
            <button  onClick={delogare}>Deconecteaza-te</button>
        </div>
    </ul>
    );
}

export default NavbarAdmin;