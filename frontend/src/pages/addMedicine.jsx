import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';

function AddMedicine() {
  let { errors, handleSubmit, register } = Validation('username')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let c = (data) => {
    console.log(data);
  }
  let inputArr = [
    { title: 'activeIngredients', placeholder: 'enter active ingredients', type: 'activeIngredients', showErr: errors.activeIngredients?.message, register: register("activeIngredients") },
    { title: 'price', placeholder: 'enter price', type: 'price', showErr: errors.price?.message, register: register("price") },
    { title: 'availableQuantity', placeholder: 'enter available Quantity', type: 'availableQuantity', showErr: errors.availableQuantity?.message, register: register("availableQuantity") },

  ];
  let btnArr = [
    {
      title: 'Add Medicine',
      style: 'green-btn',
      action: handleSubmit(c),
    },
  ];

  return (
    <div>
      <Form title="Add Medicine" inputArr={inputArr} type="addMedicine" btnArr={btnArr} />
    </div>
  );
}
export default AddMedicine;
