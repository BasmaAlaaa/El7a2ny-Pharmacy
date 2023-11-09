const patient =require('../Models/patient');
const Pharmacist = require('../Models/pharmacist');
const jwt = require ('jsonwebtoken');
const Administrator = require('../Models/administrator');
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};


const login = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const userpharmacist = await Pharmacist.findOne({ Username: Username });
    const userPatient = await patient.findOne({ Username: Username });
    const userAdmin = await Administrator.findOne({ Username: Username });

    if (userpharmacist && !userPatient&& !userAdmin) {
      //const isPasswordMatch1 = await compare(password, userpharmacist.Password);
          
      if (password===userpharmacist.Password) {
        const token = createToken(userpharmacist.Username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ userpharmacist, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else if (!userpharmacist && userPatient&& !userAdmin) {
       
        if (password===userPatient.Password) {
          const token = createToken(userPatient.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userPatient, token });
        }
        else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else if (!userpharmacist && !userPatient&& userAdmin) {
      if (password===userAdmin.Password) {
          const token = createToken(userAdmin.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userAdmin, token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else {
      res.status(401).json({ error: 'User not found' });
    }
  }
   catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Clear the JWT cookie to log the user out
  res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
    login,
    logout
  };