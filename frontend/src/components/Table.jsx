import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data }) {
  let navigate = useNavigate()

  return (
    <>
      {data.medicineName &&<th>{data.medicineName}</th>}
      {data.activeIngredients&&<td>{data.activeIngredients&&data.activeIngredients}</td>}
      {data.price&&<td>{data.price}</td>}
      {data.photo && <td> <img src = {data.photo} alt='image' width={60} height={60}/> </td>}
      {data.medicalUse&&<td>{data.medicalUse}</td>}

      {data.name&&<th>{data.name}</th>}
      {data.gender&&<td>{data.gender}</td>}
      {data.age&&<td>{data.age}</td>}
      {data.email&&<td>{data.email}</td>}
      {data.mobileNumber&&<td>{data.mobileNumber}</td>}
      {data.affiliation&&<td>{data.affiliation}</td>}
      {data.hourlyRate&&<td>{data.hourlyRate}</td>}
      {data.educationalBackground&&<td>{data.educationalBackground}</td>}
      {data.medicineName &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/medicineView/${data.medicineName}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.gender &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/patientInfo/${data.username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
      {data.affiliation &&
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/pharmacistInfo/${data.username}`)}
      >
        View
      </button>
      </div>
      </td>
      }
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
            e : e.medicalUse.toLowerCase() === filterText.toLowerCase()
          })
          .filter((e) => {
            return searchText.toLowerCase() === '' ? 
            e: e.medicineName.toLowerCase().includes(searchText.toLowerCase())
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
