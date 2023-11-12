import MainBtn from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import { useState } from 'react';
import NavBar from '../components/NavBar.jsx';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';



function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { username } = useParams();
  console.log(username)
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      const data = { oldPassword: oldPassword, newPassword: password, confirmPassword: confirmPassword }
      console.log(data)
      const response = axios.put(`http://localhost:8000/ChangePassword/${username}`, data, { withCredentials: true });
      if(response.status === 200) {
        alert(`Password updated successfully`);
        console.log(response.data.message);
        const res = axios.get('http://localhost:8000/logout');
        localStorage.removeItem('token');
        navigate(`/login`);     
      }
    }catch(error){
        alert(`Failed to change password`);
        console.error('Error response:', error.response);
          console.error('Error accepting request:', error);
      };
  }
  return (
    <div>
      <NavBar />
      {/* <Form title="change password" inputArr={inputArr} btnArr={btnArr} /> */}
      <form
        className="d-flex justify-content-center"
      >
        <div className="form-width">
          <p className="text-capitalize fs-4">Change Password</p>

          <Input
            title='old password'
            placeholder='enter old password'
            type='password'
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <Input
            title='New password'
            placeholder='enter new password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            title='confirm Password'
            placeholder='confirm password'
            type='password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


          {/* {type == 'register' && (
          <p className="text-center mt-3 small-txt">
            By Creating an account you agree to our
            <a className="green-txt"> Terms of use </a>
            and
            <a className="green-txt"> Privacy Policy</a>
          </p>
        )} */}

          <div className="mt-3">
            <MainBtn
              txt='save'
              style='green-btn'
              action={handleSubmit}

            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default ChangePassword;
