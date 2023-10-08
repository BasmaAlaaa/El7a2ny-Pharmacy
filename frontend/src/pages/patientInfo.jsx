import { useParams} from 'react-router-dom';
import NavBarAdministrator from "../components/NavBarAdministrator";


function PatientInfo(){

    const {username} = useParams();

    return (
        <div>
        <NavBarAdministrator/>
        <h1>Patient Info</h1>
        <ul>
            <h3>Name:</h3>
            <h3>Email:</h3>
            <h3>Date of Birth:</h3>
            <h3>Gender:</h3>
            <h3>Mobile Number:</h3>
        </ul>
        <ul>
            <h2>Emergency Contact:</h2>
            <h3>Name:</h3>
            <h3>Mobile Number:</h3>
            <h3>Relation:</h3>
        </ul>
        <button>
            Remove Patient
        </button>
        </div>
    )
    }
    export default PatientInfo;