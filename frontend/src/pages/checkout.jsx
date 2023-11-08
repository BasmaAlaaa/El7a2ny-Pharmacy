import { useState } from "react";
import MainBtn from "../components/Button";
import Input from "../components/Input";
import NavBarPatient from "../components/NavBarPatient";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Checkout() { 
    const [address, setAddress] = useState("");
    const [card, setCard] = useState(false);
    const {username} = useParams();
    let navigate = useNavigate()
    console.log('adddd',address)

    const handleSubmit = (e) => {
      const data = {newAddress:address};
      console.log(data)
      const response = axios.post(`http://localhost:8000/Patient/AddAddressToPatient/${username}`, data)
  .then(res =>console.log(res.data)).catch(err => console.log(err))
    }

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
        <h4>Choose Address</h4>
        <select name='medicalUse' >
        <option value='all'>All</option>
        <option value='pain Killer'>Pain killer</option>
        <option value='antiinflammatory'>Antiinflammatory</option>
        </select>
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