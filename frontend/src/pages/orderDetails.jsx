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
    const [id, setId] = useState('');
    const[result, setResult] = useState([]);
    const[resultCancel, setResultCancel] = useState('');
    const[resultDelete, setResultDelete] = useState([]);

  const handleCancel = () => {
    const response = axios.put(`http://localhost:8000/Patient/CancelOrder/${result._id}`)
    .then(res =>setResultCancel(res)).catch(err => console.log(err))
    navigate(`/patientView/${username}`)

  }
  console.log('cancelll', resultCancel);

    useEffect(() => {
  const response = axios.get(`http://localhost:8000/Patient/GetOrderDetails/${username}`)
  .then(res =>setResult(res.data)).catch(err => console.log(err))
    }, [])
  //  setId(result._id);
  console.log('iddd', result);

 let tHead = ['Name', 'Amount'];
//  let tHead = ['Username', 'Payment Method', 'Medication'];


    return (
        <div>
        <NavBarPatient username={username}/>
        <h2>Order Details</h2>
        <h3>Payment Method: {result.PaymentMethod}</h3>
        <h3>Status: {result.Status}</h3>
        <h3>Total Amount: {result.TotalAmount}</h3>
        <h3>Shipping Address: {result.ShippingAddress}</h3>



        {/* <OrderList username={username}/> */}
        {result.Items && <TableOrder tHead={tHead} data={result.Items} />
}

        <MainBtn
              txt="Cancel Order"
              style="white-btn"
              action={handleCancel}
              key="navBtn"
            />
        
        </div>
    )
    }
    export default OrderDetails;