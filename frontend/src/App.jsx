import { Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/all.css';
import Login from './pages/login';
import NavBar from './components/NavBar';
import RegisterPatient from './pages/registerPatient';
import RegisterPharmacist from './pages/registerPharmacist';
import AdministratorView from './pages/administratorView';
import PatientView from './pages/patientView';
import PharmacistView from './pages/pharmacistView';
import MedicineList from './pages/medicineList';
import MedicineView from './pages/medicineView';




function App() {
  return (
    <div className='main'>
      <NavBar />
      <main>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registerPatient" element={<RegisterPatient />} />
          <Route exact path="/registerPharmacist" element={<RegisterPharmacist />} />
          <Route exact path="/patientView" element={<PatientView />} />
          <Route exact path="/pharmacistView" element={<PharmacistView />} />
          <Route exact path="/administratorView" element={<AdministratorView />} />
          <Route exact path="/medicineView" element={<MedicineView />} />
          <Route exact path="/medicineList" element={<MedicineList />} />


        </Routes>
      </main>
    </div>
  );
}

export default App;
