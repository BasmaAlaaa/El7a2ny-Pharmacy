import { useState, useEffect } from "react";
import NavBarAdministrator from "../components/NavBarAdministrator";
import { useParams} from 'react-router-dom';
import axios from "axios";
import search from '../assets/images/svg/search.svg';
import NavBarPharmacist from "../components/NavBarPharmacist";
import TableSalesReport from "../components/TableSalesReport";

function SalesReportInfo(){
    const {username, type} = useParams();
    const[result, setResult] = useState([]);
    const[filterText, setFilterText] = useState('');
    const[searchText, setSearchText] = useState('');
    const[searchDate, setSearchDate] = useState('');


//     useEffect(() => {
//   const response = axios.get(`http://localhost:8000/Admin/viewSalesReportOnChosenMonth/${username}/${filterText}`,{
//     headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
//   })
//   .then(res =>setResult(res.data)).catch(err => console.log(err))
//     }, [])

const onFilterValueChanged=(event)=>{
    setFilterText(event.target.value);
    console.log(filterText);
    viewSales();
    
  }
  const viewSales = async() => {
    await axios.get(`http://localhost:8000/Pharmacist/viewSalesReportOnChosenMonth/${username}/${filterText}`,{
      headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
    })
    .then(res =>setResult(res.data.medicineSales)).catch(err => console.log(err))
  }
  console.log('sales', result)

let tHead = ['Medicine Name', 'Date', 'Total'];

return (
    <div>
        {type==='admin' &&
        <NavBarAdministrator username={username}/>
        }
        {type==='pharmacist' &&
        <NavBarPharmacist username={username}/>
        }
        <select name='medicalUse' onChange={onFilterValueChanged}>
        <option value='all'>All</option>
        <option value='january'>January</option>
        <option value='february'>February</option>
        <option value='march'>March</option>
        <option value='april'>April</option>
        <option value='may'>May</option>
        <option value='june'>June</option>
        <option value='july'>July</option>
        <option value='august'>August</option>
        <option value='september'>September</option>
        <option value='october'>October</option>
        <option value='november'>November</option>
        <option value='december'>December</option>

        </select>
        {filterText && filterText!="all" &&
        <div>
            <div className="d-flex justify-content-between flex-row">
      <p className="text-capitalize fs-4 w-25">{filterText} Sales Report</p>
      <div className="d-flex flex-row w-75 justify-content-end">
        <div className="input-group w-50">
        <input
            type="date"
            className="form-control border-start-0 search ps-0"
            placeholder="Filter by date"
            onChange={(e) => setSearchDate(e.target.value)}
          />
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
      </div>
    </div>
        <TableSalesReport tHead={tHead} data={result} searchText={searchText} searchDate={searchDate}/>
        </div>
        }
        </div>
)
}
export default SalesReportInfo;