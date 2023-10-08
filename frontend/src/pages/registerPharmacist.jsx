import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import Validation from '../validate/validate.js';
import NavBar from '../components/NavBar.jsx';

function RegisterPharmacist() {
  let {errors,handleSubmit,register} = Validation('createAccount')
  const navigate = useNavigate();
  let c = (data) => {
    console.log(data);
  }
  let inputArr = [
    { title: 'username', placeholder: 'enter your username', type:'text', showErr:errors.username?.message, register: register("username")},
    { title: 'name', placeholder: 'enter your name', type:'text', showErr:errors.name?.message, register: register("name") },
    { title: 'email', placeholder: 'enter your email', type:'email', showErr:errors.email?.message, register: register("email")},
    { title: 'password', placeholder: 'enter password',type:'password', showErr:errors.password?.message, register: register("password") },
    { title: 'confirm password', placeholder: 'enter password',type:'password', showErr:errors.confirmPassword?.message, register: register("confirmPassword") },
    { title: 'date of birth', placeholder: 'enter your date of birth', type:'date', showErr:errors.dateOfBirth?.message, register: register("dateOfBirth") },
    { title: 'hourly rate', placeholder: 'Enter your hourly rate', type:'text', showErr:errors.hourlyRate?.message, register: register("hourlyRate") },
    { title: 'affiliation', placeholder: 'enter hospital name', type: 'text', showErr:errors.affiliation?.message, register: register("affiliation") },
    { title: 'Educational background', placeholder: 'enter your educational background', type:'text', showErr:errors.educationalBackground?.message, register: register("educationalBackground") },


  ];
  let btnArr = [
    {
      title: 'create account',
      style: 'green-btn',
      action: handleSubmit(c),
    },
  ];
  return (
    <div>
      <NavBar/>
      <Form
        title="create account"
        inputArr={inputArr}
        btnArr={btnArr}
        type="register"
      />
    </div>
  );
}
export default RegisterPharmacist;
