import { useState, useEffect } from "react";
import MainBtn from "../components/Button";
import Input from "../components/Input";
import NavBarPatient from "../components/NavBarPatient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TableAddresses from "../components/TableAddresses";


function Checkout() { 
    const [address, setAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
    const [allAddresses, setAllAddresses] = useState([]);
    const [card, setCard] = useState(false);
    const {username} = useParams();
    let navigate = useNavigate()
    console.log('del',deliveryAddress)
    

    useEffect(() => {
      const response = axios.get(`http://localhost:8000/Patient/GetPatientAddresses/${username}`)
      .then(res =>setAllAddresses(res.data)).catch(err => console.log(err))
        }, [])
        console.log('all add', allAddresses);

    const handleSubmit = (e) => {
      const data = {newAddress:address};
      console.log(data)
      const response = axios.post(`http://localhost:8000/Patient/AddAddressToPatient/${username}`, data)
  .then(res =>console.log(res.data)).catch(err => console.log(err))
    }
  let tHead = ['Address', 'Select'];


    return(
        <div>
            <NavBarPatient/>
 <form
      className="d-flex justify-content-center"
    >
      <div className="form-width">
        <p className="text-capitalize fs-4">Delivery Address</p>
 
          <Input
            title='Add Address'
            placeholder='Add a new delivery address'
            type='text'
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="mt-3">
            <MainBtn
              txt='Add Address'
              style='green-btn'
              action={handleSubmit}
              
            />
          <h4>Delivery Address: {deliveryAddress}</h4>
        <h4>Choose Address</h4>

        <div className="case-table card mt-4">
      <table className="table table-striped m-0">
        <thead>
          <tr className="text-capitalize">
            {tHead.map((e) => (
              <th scope="col">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allAddresses
          .map((e) => (
            <tr className="text-capitalize">

    <th>{e}</th>
    
    <td className="py-3 text-align-center">
    <div className="d-flex flex-row">
    <button
      className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={(s) =>{
          s.preventDefault();
          setDeliveryAddress(e)}
        } 
    >
      Select
    </button>
    </div>
    </td>   

    </tr>
          ))}
        </tbody>
      </table>
    </div>

        <h4>Choose Payment Method</h4>
        <div>
            <input
            type='radio'  value={'wallet'} />
            Pay with wallet
        </div>
        <div>
            <input
            type='radio'  value={'cash'} />
            Cash on delivery
        </div>
        <div>
            <input
            type='radio'  value={'card'} />
            Pay by card
        </div>
        
        <Input
            title='Card Number'
            placeholder='Enter card number'
            type='text'
           // onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            title='Expiry Date'
            type='date'
           // onChange={(e) => setAddress(e.target.value)}
          />
          <Input
            title='CVV'
            placeholder='Enter CVV'
            type='text'
           // onChange={(e) => setAddress(e.target.value)}
          />

          <div className="mt-3">
            <MainBtn
              txt='Add Card'
              style='green-btn'
              //action={handleSubmit(c)}
              
            />
            </div>
        </div>
        <h3>Submit Order</h3>
        <MainBtn
              txt='Submit Order'
              style='green-btn'
             action={() => navigate('/orderDetails')}
              
            />
      </div>
    </form>
    
   </div>
    )
}
export default Checkout;