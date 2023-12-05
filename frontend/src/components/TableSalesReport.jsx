import { useNavigate } from 'react-router-dom';
import TableItems from './TableItems';
import { useState } from 'react';
import axios from 'axios';
import MainBtn from './Button';


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()

  return (
    <>
    <th>{data._id}</th>
    <td>{data.PaymentMethod}</td>
    <td>{data.Status}</td>
    <td>{data.TotalAmount}</td>
    <td>{data.ShippingAddress}</td>
      
      
    </>
  );
}

// function NoramlTableBody({ data }) {
//   let arr = [];
//   for (let key in data) arr.push(data[key]);

//   return (
//     <>
//       {arr.map((e) => (
//         <td>{e}</td>
//       ))}
//     </>
//   );
// }

function TableSalesReport({ tHead, data, searchText, searchDate}) {
  return (
    <div className="case-table card mt-4">
      <table className="table table-striped m-0">
        <thead>
          <tr className="text-capitalize">
            {tHead.map((e) => (
              <th scope="col">{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
          .filter((e) => {
            return searchText.toLowerCase() === '' ? 
            e: e.Name.toLowerCase().includes(searchText.toLowerCase())
          })
          .filter((e) => {
            return searchDate=== ''?
            e: e.Date.substring(0,10) === searchDate
          })
          .map((e) => (
            <tr className="text-capitalize">
                <CaseTableBody data={e} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableSalesReport;
