import React,{useState} from 'react'
import "../Routes/style.css";
import Modal from '@material-ui/core/Modal';
import { useEffect } from 'react';
import Serviciiuser from './ServiciiUser';
import Recenzii from './Rencezii';
import DatePicker, { DateObject } from "react-multi-date-picker"
import ProgramareSalonclient from './Programare_Salon';
import moment from 'moment';



const Salonuser=(comp)=>{
    const [open, setOpen]=useState(false);
    const [serviciiup,setServicii]=useState([]);
    const [date, setDate] = useState(null);
    
    const [toggle,setToggle]=useState(false);
    
    const [Continut,setRecenzie]=useState("");
    const [Rating,setRating]=useState(0);
    const [hover, setHover] = useState(0);
    const [succes,setSucces]=useState(false);


    const [succes2,setSucces2]=useState(false);

    const [GETrecenzii,setGETRecenzii]=useState([]);
    const [dateRecenzii,setDateRecenzii]=useState();

    var ziuaactuala=new DateObject();
    

    const[formularprogramare,setProgramare]=useState(false);
    const [DataProgram, setValue] = useState(ziuaactuala);
    const [Ora,setOra]=useState(0);
    
    const [limitaora,setLimitaOra]=useState();
    const [optiuni,setOptiuni]=useState([]);
    const [selectat,setSelectat]=useState("");
    const [IdServiciu,setIdServiciu]=useState(null);
    const [deschis,setDeschis]=useState(false);
    const [disableora,setDisableOra]=useState(true)

    const dropdown=()=>{   //dropdown formular programari
        setDeschis(!deschis);
    }

    const handleora=(event)=>{
         const arr=limitaora.split('-')
         const valoare=Math.max(Number(arr[0]), Math.min(Number(arr[1]), Number(event.target.value)));
         const integerPart = Math.floor(valoare); 
         const decimalPart = valoare % 1; 
        const sanitizedDecimal = Math.min(decimalPart, 0.59);
        const sanitizedDecimalFixed=parseFloat(sanitizedDecimal.toFixed(2))
        const sanitizedValue = integerPart +sanitizedDecimalFixed;
         setOra(sanitizedValue);
    }

    const handleOptionClick = (option,option2) => {
        setSelectat(option);
        updateora(option2);
        setLimitaOra(option2)
        setDeschis(false);
      };






    function updateora(array){
        const arr=array.split('-')
        setOra(Number(arr[0]));
        setDisableOra(false);
    }


    


    function getServicii(){
        let rezultat=fetch(`http://localhost:5000/servicii/${comp.comp.IdSalon}`,{
             method:'GET',
             headers:{"Content-Type":"application/json"},
          }).then(response=>response.json())
          .then(data=>setServicii(data))
    }


    function getCurrentDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
      }


    async function trimiterecenzie(){
        let Data_postarii= getCurrentDate();
        
        let obiect={Continut,Rating,Data_postarii}
        let rezultat=await fetch(`http://localhost:5000/recenzie/${comp.comp.IdSalon}`,{
            method:'POST',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
            body:JSON.stringify(obiect)
         })
        if(rezultat.status===200){
            setRecenzie("");
            setRating(0);
            setHover(0);
            setSucces(true);
        } 
    }


    function primirerecenzii(){
        let rezultat=fetch(`http://localhost:5000/recenzie/${comp.comp.IdSalon}`,{
             method:'GET',
             headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
          }).then(response=>response.json())
          .then(data=>setGETRecenzii(data))
    }



    const[programariprimite,setProgramariprimite]=useState([])
    const[componentepro,setComponentePro]=useState()



    function primireprogramari(){
        let rezultat=fetch(`http://localhost:5000/programare/${comp.comp.IdSalon}`,{
            method:'GET',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
         }).then(response=>response.json())
         .then(data=>setProgramariprimite(data))

    }


    const handleClose = () => {
        setOpen(false);
        setRecenzie("");
        setRating(0);
        setHover(0);
        setSucces(false);
        setSucces2(false);
        setProgramare(false);
        setToggle(false);
    };
 
    const formularshow=()=>{
        setToggle(!toggle)
    }

    
    const handleOpen = () => {
        setOpen(true);
        getServicii();
        primirerecenzii();
        primireprogramari();
    };

    


    async function realizareprogramare(){
        var dataprogramata=DataProgram.year+"-"+DataProgram.month+"-"+DataProgram.day
      
        let obiect={dataprogramata,Ora}
        let rezultat=await fetch(`http://localhost:5000/programare/${IdServiciu}`,{
            method:'POST',
            headers:{'Authorization':'Bearer '+localStorage.getItem('user-info'),"Content-Type":"application/json"},
            body:JSON.stringify(obiect)
         })
         if (rezultat.status) {
            
            setDisableOra(true);
            setIdServiciu(null);
            setValue(ziuaactuala);
            setSelectat("");
            setSucces2(true);
        }           
       
    }
   
  


    useEffect(()=>{
        if(programariprimite.length){
            const taguri=programariprimite.map((comp)=>(
                <ProgramareSalonclient comp={comp} key={Math.random()} />
            ))
            setComponentePro(taguri)
        }
        else{
            const taguri=<p>Acest salon nu are programari facute in momentlul actual.</p>
            setComponentePro(taguri)
        }
    },[programariprimite])




    useEffect(()=>{
        if(serviciiup.length){
            const newdate=serviciiup.map((comp)=>(
                <Serviciiuser comp={comp} key={Math.random()}/>
            ))
            setDate(newdate);
            const optiune=serviciiup.map((valoare)=>{
                return {IdServiciu:valoare.IdServiciu,Denumire:valoare.Denumire,Program:valoare.Program}
            })
            setOptiuni(optiune)
            }else{
                const newdate=<p>Acest salon nu are servicii disponibile</p>
                setDate(newdate)
            } 
                
    },[serviciiup])

    const variabilanoua=comp.prop
   
    useEffect(()=>{
        if(GETrecenzii.length){
            const newrecenzii=GETrecenzii.map((comp)=>(
                <Recenzii comp={comp} key={Math.random()} prop={variabilanoua} />
            ))
            setDateRecenzii(newrecenzii)
        }
        else{
            const newrecenzii=<p>Fii primul care lasa o recenzie acestui salon</p>
            setDateRecenzii(newrecenzii)
        }
    },[GETrecenzii])




    let mesajconfirmare;
    if(succes===true){
        mesajconfirmare=<p>Recenzia voastra a fost trimisa cu succes.</p>
    }

    let mesajconfirmare2;
    if(succes2===true){
        mesajconfirmare2=<p>Programarea voastra a fost trimisa cu succes. Administratorul salonului va verifica in scurt timp programarea dumneavoastra.</p>
    }


    let formularrecenzie;
    if(toggle===true){
        formularrecenzie=<div className='formularrecenzie'>
            {/* <input type='text'placeholder='Titlu' className='baraR' value={Titlu} onChange={(e)=>setTitlu(e.target.value)}/> */}
            <textarea rows={4} cols={40} value={Continut} onChange={(e)=>setRecenzie(e.target.value)}/>
            <h1>Cate stele ii dai acestui salon?</h1>
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || Rating) ? "on" : "off"}
                        onClick={() => setRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(Rating)}
                    >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
      {mesajconfirmare}
    </div>
            <button className='butondesalon2' onClick={trimiterecenzie}>Trimite</button>
            
        </div>
    }

    

    function afisare(){
        setProgramare(!formularprogramare)
    }
    
    


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
            <div>
                <h1>Programari:</h1>
                {componentepro}
                {serviciiup.length!==0 && 
                <div>
                <h1>Realizeaza o programare:</h1>
                <button onClick={afisare}>V</button>
                {formularprogramare===true &&
                     <div>
                        <p>Alegeti ziua doirta:</p>
                        <DatePicker value={DataProgram} minDate={ziuaactuala} maxDate={new DateObject().add(1, "M")} onChange={(date, { input, isTyping }) => {
                            if (!isTyping) return setValue(date); 

                            const strings = input.value.split("/");
                            const numbers = strings.map(Number);
                            const [year, month, day] = numbers;

                            if (input.value && numbers.some((number) => isNaN(number))) {
                                return false; 
                            }

                            if (month > 12 || month < 0) return false; 
                            if (day < 0 || (date && day > date.day)) return false;
                            if (strings.some((val) => val.startsWith("00"))) return false;

                            setValue(date);
  }}/>
                        <p>Alege serviciul dorit</p>
                        <div>
                            
                            <input
                                type="text"
                                value={selectat}
                                onClick={dropdown}
                            />
                            {deschis && (
                                <ul>
                                {optiuni.map(option => (
                                    <li onClick={() =>handleOptionClick(option.Denumire,option.Program) & setIdServiciu(option.IdServiciu) } key={option.IdServiciu}>{option.Denumire}</li>
                                ))}
                                </ul>
                            )}
                        </div>
                        <p>Alegeti ora dorita:</p>
                        <input type='number' disabled={disableora} value={Ora} onChange={handleora} /><br/>
                        <button className='butondesalon2' onClick={realizareprogramare}>Confirma</button>
                        
                        {mesajconfirmare2}



                    </div>}</div>}
            </div>
            <h1>Recenzii:</h1>
            <div className=''>
                    {dateRecenzii}
                <h1>Lasa o recenzie</h1><br/>
                <button className='togglerecenzie' onClick={formularshow}>V</button>
                {formularrecenzie}
            </div>
        </div>
            </Modal>
        </div>
    )
}

export default Salonuser;