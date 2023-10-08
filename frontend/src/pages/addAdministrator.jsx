import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import { useDispatch } from 'react-redux';
import { loggedIn } from '../features/login.js';
import Validation from '../validate/validate';
import NavBarAdministrator from '../components/NavBarAdministrator.jsx';

function AddAdministrator() {
  let { errors, handleSubmit, register } = Validation('username')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let c = (data) => {
    console.log(data);
  }
  let inputArr = [
    { title: 'username', placeholder: 'enter username', type: 'username', showErr: errors.username?.message, register: register("username") },
    { title: 'password', placeholder: 'enter password', type: 'password', showErr: errors.password?.message, register: register("password") },
  ];
  let btnArr = [
    {
      title: 'Add Administrator',
      style: 'green-btn',
      action: handleSubmit(c),
    },
  ];

  return (
    <div>
      <NavBarAdministrator/>
      <Form title="Add Administrator" inputArr={inputArr} type="addAdministrator" btnArr={btnArr} />
    </div>
  );
}
export default AddAdministrator;
