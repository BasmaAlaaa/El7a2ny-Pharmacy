const nodemailer = require('nodemailer');
const patient = require('../Models/patient');
const pharmacist = require('../Models/pharmacist');
const OTP = require('../Models/OTP');

// Function to generate a random OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'SuicideSquadGUC@gmail.com',
    pass: 'wryq ofjx rybi hpom'
  }
});

const sendOTP = async ({ body }, res) => {
  const { Email } = body;
  const isPatient = await patient.findOne({ Email : Email});
  const isPharmacist = await pharmacist.findOne({ Email : Email });
  console.log('isPatient:', isPatient);
  console.log('isPharmacist:', isPharmacist);
  if (!isPatient && !isPharmacist ) {
    console.log('Invalid Email');
    res.status(400).json({ error: 'Invalid Email' });
    return;
  }

  try {
    // Generate OTP
    const otp = generateOTP();

    // Store the OTP in MongoDB
    const otpDocument = new OTP({ Email, otp });
    await otpDocument.save();

    // Define the email options
    const mailOptions = {
      from: 'SuicideSquadGUC@gmail.com',
      to: Email,
      subject: 'Your OTP for Verification',
      text: `Dear User,

      We hope this email finds you well. It seems like you've requested to reset your password for Suicide Squad Pharmacy, and we're here to assist you with that.

      To proceed with resetting your password,

      Your OTP is: ${otp}

      If you didn't request this password reset, please ignore this email. Your account security is our top priority, and no changes will be made without your confirmation.

      If you encounter any issues or have further questions, feel free to reach out to our support team at SuicideSquadGUC@gmail.com .

      Thank you for choosing Suicide Squad Pharmacy. We appreciate your trust in us.

      Best regards,

      Suicide Squad Support Team `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ');

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Async function to update the user's password in MongoDB
const updatePassword = async ({ body }, res) => {
  const { Email, otp, newPassword } = body;
  try {
    // Find the OTP document in the database
    const otpDocument = OTP.findOne({ Email : Email , otp : otp });
    console.log("OTP DOC", otpDocument);

    if (!otpDocument) {
      console.log(`Invalid OTP`);
      res.status(400).json({ error: 'Invalid OTP' });
      return;
    }
    else{
     otpDocument.remove();
    }

    // Update the user's password in MongoDB
    const updatedPatient = await patient.findOneAndUpdate(
      { Email: Email },
      { Password: newPassword },
      { new: true }
    );

    if (updatedPatient) {
      console.log(`Password updated for Patient with email: ${email}`);
    } else {
      const updatedPharmacist = await pharmacist.findOneAndUpdate(
        { Email: Email },
        { password: newPassword },
        { new: true }
      );

      if (updatedPharmacist) {
        console.log(`Password updated for pharmacist with email: ${Email}`);
      }  else {
          console.log('User not found');
          res.status(404).json({ error: 'User not found' });
        }
      }
    

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update password' });
  }
};

module.exports = {
  sendOTP,
  updatePassword
};