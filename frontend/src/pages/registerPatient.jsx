import { useNavigate } from 'react-router-dom';
import Form from '../components/Form.jsx';
import Validation from '../validate/validate.js';
import NavBar from '../components/NavBar.jsx';

function RegisterPatient() {
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
    { title: 'gender', placeholder: 'select your gender', type:'text', showErr:errors.gender?.message, register: register("gender") },
    { title: 'mobile number', placeholder: 'enter your mobile number', type: 'tel', showErr:errors.mobileNumber?.message, register: register("mobileNumber") },
    { title: 'Emergency contact full name', placeholder: 'enter your emergency contact full name', type:'text', showErr:errors.emergencyName?.message, register: register("emergencyName") },
    { title: 'Emergency contact mobile number', placeholder: 'enter your emergency contact mobile number', type:'text', showErr:errors.emergencyMobile?.message, register: register("emergencyMobile") },
    { title: 'Emergency contact relation to the patient', placeholder: 'enter your emergency contact relation to the patient', type:'text', showErr:errors.emergencyRelation?.message, register: register("emergencyRelation") },



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
export default RegisterPatient;
