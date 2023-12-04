import { useNavigate } from 'react-router-dom';
import axios from "axios";


function CaseTableBody({ data, username }) {
  let navigate = useNavigate()

  return (
    <>
    <th>{data.Name}</th>
    <td>{data.ActiveIngredients}</td>
    <td>{data.Price}</td>
    <td> <img src = {data.Picture} alt='image' width={60} height={60}/> </td>
    <td>{data.MedicalUse}</td>
    <td>{data.Quantity}</td>
    <td>{data.QuantitySold}</td>
      
      <td className="py-3 text-align-center">
      <div className="d-flex flex-row">
      <button
        className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
        onClick={()=>navigate(`/editMedicine/${data.Name}/${username}`)}
      >
        Edit
      </button>
      </div>
      </td>
    {data.Status==='unarchived' &&
    <td className="py-3 text-align-center">
    <div className="d-flex flex-row">
    <button
      className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
      onClick={()=> axios.put(`http://localhost:8000/Doctor/archiveMedicine/${username}/${data.Name}`,"",{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
    >
      Archive
    </button>
    </div>
    </td>
    }
    {data.Status==='archived' &&
    <td className="py-3 text-align-center">
    <div className="d-flex flex-row">
    <button
      className={`green-txt mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
      onClick={()=> axios.put(`http://localhost:8000/Doctor/unArchiveMedicine/${username}/${data.Name}`,"",{
        headers: { authorization: "Bearer " + sessionStorage.getItem("token")},
      }).then(res => console.log(res)).catch(err => console.log(err))}
    >
      Unarchive
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

function TablePharmacist({ tHead, data, searchText, filterText, username}) {
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
                <CaseTableBody data={e} username={username}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablePharmacist;
