import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import NavBarPatient from "../components/NavBarPatient";
import CartList from "../components/CartList";
import MainBtn from "../components/Button";
import { useNavigate } from 'react-router-dom';
import OrderList from "../components/OrderList";
import TableOrder from "../components/TableOrder";



function OrderDetails(){
    let navigate = useNavigate()

    const {username} = useParams();
    const[result, setResult] = useState([]);
    const[resultDelete, setResultDelete] = useState([]);



    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Patient/GetOrderDetails/${username}`)
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])

  console.log(result)

 let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'MedicalUse', 'Amount'];
//  let tHead = ['Username', 'Payment Method', 'Medication'];


    return (
        <div>
        <NavBarPatient username={username}/>
        <h2>Order Details</h2>
        <h3>Payment Method: {result.PaymentMethod}</h3>
        <h3>Status: {result.Status}</h3>

        {/* <OrderList username={username}/> */}
        {/* <TableOrder tHead={tHead} data={result} /> */}

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