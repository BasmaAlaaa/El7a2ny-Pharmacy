const Medicine = require("../Models/medicine");



// Search for medicine by name
const GetMedicineByDoctor = async (req, res) => {
    const { Name } = req.params;
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader('Access-Control-Allow-Credentials', true);
  
    
    
      try{
  
      const info = await Medicine.findOne({ Name: Name }, { _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse: 0 });
      if (!info) {
        return res.status(400).json({ error: "This medicine does not exist!" })
      }
      res.status(200).json(info);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  
 

  module.exports = {GetMedicineByDoctor};