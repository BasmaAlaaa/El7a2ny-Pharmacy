
import Table from '../components/Table.jsx';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';
import MainBtn from '../components/Button.jsx';

function AdministratorView() {
  const[searchText, setSearchText] = useState('');
  const[filterText, setFilterText] = useState('');

  useEffect(() => {
const response = Axios.get('http://localhost:8000/Pharmacist/AvailableMedicinesDetailsByPharmacist')
.then(res =>console.log(res.data)).catch(err => console.log(err))
  }, [])
const onFilterValueChanged=(event)=>{
  setFilterText(event.target.value);
}
console.log(filterText)
let navigate = useNavigate()

  let tHeadPatient = ['Name', 'Gender', 'Age', 'Email', 'Mobile Number'];
  let dataPatient = [{
    name: 'Joy',
    gender: 'female',
    age: 20,
    email: 'joy@gmail.com',
    mobileNumber: '013232312321'
  }
];
  let actionsPatient = [
    { title: 'view', color: 'green-txt',action:()=>navigate('/patientInfo') },
  ];

  let tHeadPharmacist = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground'];
  let dataPharmacist = [{
    name: 'Mohamed',
    affiliation: 'X hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy'
  }
];
  let actionsPharmacist = [
    { title: 'view', color: 'green-txt',action:()=>navigate('/pharmacistInfo') },
  ];

  let tHeadRequests = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground'];
  let dataRequests = [{
    name: 'Ahmed',
    affiliation: 'Y Hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy'
  }
];
  let actionsRequests = [
    { title: 'view', color: 'green-txt',action:()=>navigate('/requestInfo') },
  ];

  return (
    <div>
        <NavBarAdministrator/>
        <div>
            <MainBtn
              txt="Add Administrator"
              style="green-btn"
              action={() => navigate('/addAdministrator')}
              key="navBtn"
            />
          </div>
        <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Patients</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadPatient} data={dataPatient} actions={actionsPatient} filterText='' searchText=''/>

      <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadPharmacist} data={dataPharmacist} actions={actionsPharmacist} filterText='' searchText=''/>

    <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists Requests</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadRequests} data={dataRequests} actions={actionsRequests} filterText='' searchText=''/>

    </div>
  );
}
export default AdministratorView;
