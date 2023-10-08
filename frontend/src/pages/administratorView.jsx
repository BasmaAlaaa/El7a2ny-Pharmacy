
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

  let tHeadPatient = ['Name', 'Gender', 'Age', 'Email', 'Mobile Number', 'View'];
  let dataPatient = [{
    name: 'Joy',
    gender: 'female',
    age: 20,
    email: 'joy@gmail.com',
    mobileNumber: '013232312321',
    username: 'joy123'
  }
];

  let tHeadPharmacist = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View'];
  let dataPharmacist = [{
    name: 'Mohamed',
    affiliation: 'X hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy',
    username: 'mohamed123'

  }
];


  let tHeadRequests = ['Name', 'Affiliation', 'Hourly Rate', 'EducationalBackground', 'View'];
  let dataRequests = [{
    name: 'Ahmed',
    affiliation: 'Y Hospital',
    hourlyRate: 1000,
    educationalBackground: 'pharmacy',
    username: 'ahmed123'

  }
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
      <Table tHead={tHeadPatient} data={dataPatient} filterText='' searchText=''/>

      <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadPharmacist} data={dataPharmacist} filterText='' searchText=''/>

    <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Pharmacists Requests</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50"></div> 
      </div>
    </div>
      <Table tHead={tHeadRequests} data={dataRequests} filterText='' searchText=''/>

    </div>
  );
}
export default AdministratorView;
