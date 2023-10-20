import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import MedicineList from "../components/medicineList";
import NavBarPatient from "../components/NavBarPatient";

function PatientView(){
    const {username} = useParams();

return (
    <div>
    <NavBarPatient username={username}/>
    <MedicineList/>
    </div>
)
}
export default PatientView;