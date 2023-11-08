import { useNavigate } from 'react-router-dom';


function CaseTableBody({ data }) {
  let navigate = useNavigate()

  return (
    <>
    <th>{data.MedicineName}</th>
    <td>{data.Quantity}</td>

    {/* <th>{data.Name}</th>
      
    <td>{data.ActiveIngredients}</td>
    <td>{data.Price}</td>
    <td> <img src = {data.Picture} alt='image' width={60} height={60}/> </td>
    <td>{data.MedicalUse}</td>
    <td>{data.Quantity}</td>
    <td>{data.QuantitySold}</td> */}
      
      
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

function TableOrder({ tHead, data}) {
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

export default TableOrder;
