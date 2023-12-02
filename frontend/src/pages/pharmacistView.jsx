import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainBtn from "../components/Button";
import NavBarPharmacist from "../components/NavBarPharmacist";
import MedicineListPharmacist from "../components/medicineListPharmacist";
import axios from "axios";
import { useEffect, useState } from "react";


function PharmacistView(){
    const navigate = useNavigate();
    const {username} = useParams();
    const [result, setResult] = useState('');
    useEffect(() => {
        axios.post('http://localhost:8000/Pharmacist/CheckMedicineQuantityNotification', {
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
        .then(res =>console.log(res.data)).catch(err => console.log(err))
        axios.post('http://localhost:8000/Pharmacist/CheckMedicineQuantityNotification', {
          headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
        })
        .then(res =>console.log(res.data)).catch(err => console.log(err))
          }, [])
        
return (
    <div>
    <NavBarPharmacist username={username}/>
    <MainBtn
              txt="Add Medicine"
              style="green-btn"
              action={() => navigate(`/addMedicine/${username}`)}
              key="navBtn"
            />
    <MedicineListPharmacist username={username}/>
    <h2>Wallet Amount:</h2>
    </div>
)
}
export default PharmacistView;