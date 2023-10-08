import NavBar from "../components/NavBar";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function MedicineView() {
//     const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const name = params.get('name');

//   const params = new URLSearchParams(window.location.search);
//   const name = params.get('name');

//   console.log(name)
  useEffect(() => {
    const postRequest = {
        url: 'http://localhost:8000/Pharmacist/MedicineByName',
        method: 'POST',
        data: {
          name: 'Cataflam'
        },
      };
      
      axios(postRequest)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
        });
      }, [])
return ( 
    <div>
        <NavBar/>
        
    </div>
)
}
export default MedicineView;