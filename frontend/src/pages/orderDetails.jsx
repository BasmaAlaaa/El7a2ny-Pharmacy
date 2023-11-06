import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import CartList from "../components/CartList";
import MainBtn from "../components/Button";
import { useNavigate } from 'react-router-dom';
import OrderList from "../components/OrderList";



function OrderDetails(){
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
        <h2>Order Details</h2>
        <OrderList username={username}/>
        <MainBtn
              txt="Cancel Order"
              style="white-btn"
              action={() => navigate('/patientView')}
              key="navBtn"
            />
        
        </div>
    )
    }
    export default OrderDetails;