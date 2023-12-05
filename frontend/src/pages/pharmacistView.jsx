import { Navigate, useNavigate, useParams } from "react-router-dom";
import MainBtn from "../components/Button";
import NavBarPharmacist from "../components/NavBarPharmacist";
import MedicineListPharmacist from "../components/medicineListPharmacist";
import axios from "axios";
import { useEffect, useState } from "react";
import TableNotifications from "../components/TableNotifications";


function PharmacistView(){
    const navigate = useNavigate();
    const {username} = useParams();
    const [notifications, setNotifications] = useState([]);
    let tHeadNot = ['Message'];


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
    useEffect(() => {
            const response = axios.get(`http://localhost:8000/Pharmacist/displayNotifications/${username}`,{
              headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
            })
              .then(res => setNotifications(res.data)).catch(err => console.log(err))
          }, [])
          console.log('notif', notifications);
        
return (
    <div>
    <NavBarPharmacist username={username}/>
    <MainBtn
              txt="Add Medicine"
              style="green-btn"
              action={() => navigate(`/addMedicine/${username}`)}
              key="navBtn"
            />
             <MainBtn
              txt="View Sales Report"
              style="green-btn"
              action={() => navigate(`/salesReportInfo/${username}/${"pharmacist"}`)}
              key="navBtn"
            />
    <MedicineListPharmacist username={username}/>
    <h2>Wallet Amount:</h2>
    <h2>Notifications:</h2>
    <TableNotifications tHead={tHeadNot} data={notifications} />
    </div>
)
}
export default PharmacistView;