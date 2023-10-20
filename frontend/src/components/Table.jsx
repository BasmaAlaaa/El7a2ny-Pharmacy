import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data }) {
  let navigate = useNavigate()

  return (
    <>
      
    {data.Name && <th>{data.Name}</th>}

    {data.ActiveIngredients && <td>{data.ActiveIngredients}</td>}
    {data.Price && <td>{data.Price}</td>}
    {data.Picture && <td> <img src = {data.Picture} alt='image' width={60} height={60}/> </td>}
    {data.MedicalUse && <td>{data.MedicalUse}</td>}
    {data.Quantity && <td>{data.Quantity}</td>}
    {data.Sales && <td>{data.Sales}</td>}

    {data.Gender&&<td>{data.Gender}</td>}
    {data.Age&&<td>{data.Age}</td>}
    {data.MobileNumber&&<td>{data.MobileNumber}</td>}

    {data.Affiliation&&<td>{data.Affiliation}</td>}
    {data.HourlyRate&&<td>{data.HourlyRate}</td>}
    {data.EducationalBackground&&<td>{data.EducationalBackground}</td>}
      

      {data.ActiveIngredients &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/medicineView/${data.Name}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Gender &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/patientInfo/${data.Username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Affiliation && !data.Status &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/pharmacistInfo/${data.Username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Status &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/requestInfo/${data.Username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.Status&&<td>{data.Status}</td>}
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

function Table({ tHead, data, searchText, filterText }) {
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
            return filterText.toLowerCase() === '' || filterText.toLowerCase() === 'all'?
            e : e.MedicalUse.toLowerCase() === filterText.toLowerCase()
          })
          .filter((e) => {
            return searchText.toLowerCase() === '' ? 
            e: e.Name.toLowerCase().includes(searchText.toLowerCase())
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

export default Table;
