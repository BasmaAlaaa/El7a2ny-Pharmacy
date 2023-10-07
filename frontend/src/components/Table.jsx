

function CaseTableBody({ data }) {
  return (
    <>
      <th>{data.medicineName}</th>
      <td>{data.activeIngredients}</td>
      <td>{data.price}</td>
      <td>
        <img src = {data.photo} alt='image' width={60} height={60}/>
        </td>
      <td>{data.medicalUse}</td>
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

function Table({ tHead, data, actions, searchText, filterText }) {
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
              
              {actions && (
                <td className="py-3 text-align-center">
                  <div className="d-flex flex-row">
                    {actions.map((j) => (
                      <button
                        className={`${j.color} mx-2 text-decoration-underline text-capitalize border-0 bg-transparent`}
                        onClick={j.action}
                      >
                        {j.title}
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
