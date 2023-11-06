
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import search from '../assets/images/svg/search.svg';
import TablePharmacist from './TablePharmacist.jsx';

function MedicineListPharmacist() {
  const[searchText, setSearchText] = useState('');
  const[filterText, setFilterText] = useState('');
  const[result, setResult] = useState([]);


  
  useEffect(() => {
const response = axios.get('http://localhost:8000/Pharmacist/AvailableMedicinesDetailsByPharmacist')
.then(res =>setResult(res.data)).catch(err => console.log(err))
  }, [])
console.log(result)
result.map((e) => {
  console.log(e)
})

const onFilterValueChanged=(event)=>{
  setFilterText(event.target.value);
}
console.log(filterText)
let navigate = useNavigate()

  let tHead = ['Name', 'Active Ingredients', 'Price', 'Photo', 'Medical Use', 'Quantity', 'Sales', 'View', 'Edit'];
  let data = [{
    medicineName: 'Cataflam',
    activeIngredients: 'Paracetamol',
    price: '100',
    photo: 'https://mybigpharmacy.com/wp-content/uploads/2019/08/TZF0JQOIEVbtsIxSC55dRWbZ9fyZywiuK9NYLh2v.jpeg',
    medicalUse: 'pain killer',
    quantity: 10,
    sales: 5
  },
  {
    medicineName: 'Panadol',
    activeIngredients: 'Paracetamol',
    price: '100',
    photo: 'https://mybigpharmacy.com/wp-content/uploads/2019/08/TZF0JQOIEVbtsIxSC55dRWbZ9fyZywiuK9NYLh2v.jpeg',
    medicalUse: 'pain killer',
    quantity: 10,
    sales: 5
  },
]
;

  return (
    <div>
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
        <select name='medicalUse' onChange={onFilterValueChanged}>
        <option value='all'>All</option>
        <option value='pain Killer'>Pain killer</option>
        <option value='antiinflammatory'>Antiinflammatory</option>
        </select>
      </div>
    </div>
      <TablePharmacist tHead={tHead} data={result} searchText={searchText} filterText={filterText}/>
    </div>
  );
}
export default MedicineListPharmacist;
