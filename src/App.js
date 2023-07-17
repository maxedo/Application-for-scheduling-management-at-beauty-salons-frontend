import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './Routes/Login';
import Signup from './Routes/Signup';
import PaginaUtilizator from './Routes/PaginaUtilizator';
import PaginaAdmin from './Routes/PaginaAdmin';
import PaginaUtilizatorFeed from './Routes/PaginaUtilizatorFeed';
import PaginaUtilizatorPorecla from './Routes/PaginaUtilizatorPorecla';
import PaginaAdminForms from './Routes/PaginaAdminForms';
import PaginaAdminSectiune from './Routes/PaginaAdminSectiune';
import Vizitator from './Routes/Vizitator';
import PaginaAdminProgramari from './Routes/PaginaAdminProgramari';
import Saloane_cautate from './Routes/Saloane_cautate';
import ProgramariVizibileUser from './Routes/ProgramariUser';
function App() {
return(
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Login />}/>
    <Route path="/signup" element={<Signup/>} />
    <Route path='/Acasa' element={<PaginaUtilizator/>}/>
    <Route path='/AcasaPorecla' element={<PaginaUtilizatorPorecla/>}/>
    <Route path='/AcasaFeed' element={<PaginaUtilizatorFeed/>}/>
    <Route path='/AcasaAdmin' element={<PaginaAdmin/>}/>
    <Route path='/PaginaAdminForms' element={<PaginaAdminForms/>}/>
    <Route path='/PaginaAdminSectiune' element={<PaginaAdminSectiune/>}/>
    <Route path='/PaginaAdminProgramari'element={<PaginaAdminProgramari/>}/>
    <Route path='/Saloane_Cautate' element={<Saloane_cautate/>}/>
    <Route path='/VerificareProg' element={<ProgramariVizibileUser/>}/>
    <Route path='/Vizitator'element={<Vizitator/>}/>
  </Routes>
</BrowserRouter>
);  
}

export default App;