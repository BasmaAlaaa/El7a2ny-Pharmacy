import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import CartList from "../components/CartList";
import MainBtn from "../components/Button";
import { useNavigate } from 'react-router-dom';



function CarttInfo(){
    let navigate = useNavigate()

    const {username} = useParams();
    const[result, setResult] = useState([]);
    const[resultDelete, setResultDelete] = useState([]);



//     useEffect(() => {
//   const response = axios.get(`http://localhost:8000/Admin/PatientInfo/${username}`)
//   .then(res =>setResult(res.data)).catch(err => console.log(err))
//     }, [])

//   console.log(result)

 

    return (
        <div>
        <NavBarPatient username={username}/>
        <CartList username={username}/>
        <MainBtn
              txt="Checkout"
              style="green-btn"
              action={() => navigate('/checkout')}
              key="navBtn"
            />
        
        </div>
    )
    }
    export default CarttInfo;