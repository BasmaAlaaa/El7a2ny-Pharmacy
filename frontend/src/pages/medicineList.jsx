import Search from '../components/Search.jsx';
import Table from '../components/Table.jsx';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';
import filter from '../assets/images/svg/filter.svg';

function MedicineList() {
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
  let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'Medical Use'];
  let data = [{
    medicineName: 'Cataflam',
    activeIngredients: 'Paracetamol',
    price: '100',
    photo: 'https://mybigpharmacy.com/wp-content/uploads/2019/08/TZF0JQOIEVbtsIxSC55dRWbZ9fyZywiuK9NYLh2v.jpeg',
    medicalUse: 'pain killer'
  },
  {
    medicineName: 'Panadol',
    activeIngredients: 'Paracetamol',
    price: '100',
    photo: 'https://mybigpharmacy.com/wp-content/uploads/2019/08/TZF0JQOIEVbtsIxSC55dRWbZ9fyZywiuK9NYLh2v.jpeg',
    medicalUse: 'pain killer'
  },
]
;
  let actions = [
    { title: 'view', color: 'green-txt',action:()=>navigate('/medicineView') },
  ];

  return (
    <div>
      {/* <Search onChange={(e) => setSearch(e.target.value)}/> */}
      <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">Medicines</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50">
          <span
            className="input-group-text bg-white border-end-0 search"
          >
            <img src={search} alt="search" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 search ps-0"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        {/* <button className="filter-btn ms-2 d-flex flex-row align-items-center">
          <img src={filter} className="me-2" alt="filter" />
          Filter
        </button> */}
        <select name='medicalUse' onChange={onFilterValueChanged}>
        <option value='all'>All</option>
        <option value='pain Killer'>Pain killer</option>
        <option value='antiinflammatory'>Antiinflammatory</option>
        </select>
      </div>
    </div>
      <Table tHead={tHead} data={data} actions={actions} searchText={searchText} filterText={filterText}/>
    </div>
  );
}
export default MedicineList;
