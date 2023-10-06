const { response } = require('express');
const medModel= require ('../Models/medecine.js');
const { MongoClient, ObjectID } = require('mongodb');
const MedModel = require('../Models/medecine.js');
const uri = 'mongodb+srv://samaelharras:samaelharrass123@aclcluster.hmtxznh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

const addMedicine = async (req, res) => {
    const { name, activeingredients, Price, quantity } = req.body;
    console.log(req.body);

    try {
        // Check if the medicine already exists
        const medecineExists = await medModel.findOne({ name });

        if (medecineExists) {
            return res.status(500).json({ error: "Already existing med" });
        }

        // If the medicine doesn't exist, proceed to create a new one
        const newMed = new medModel({ name, activeingredients, Price, quantity });
        await newMed.save();
        console.log('Med created:', newMed);
        
        res.status(200).json(newMed);
    } catch (error) {
        console.error('Error creating med:', error);
        res.status(500).json({ error: 'Failed to create med' });
    }
};


//update a med in the database
const updateMed = async (req, res) => {
const {name , Nactiveingredients, NPrice, Nquantity }= req.body;
const Nfields = {};
Nfields.activeingredients=Nactiveingredients;
Nfields.Price=NPrice;
Nfields.quantity=Nquantity;
const updateMed = await MedModel.findOneAndUpdate(
   {name: name},
   Nfields,
   {new: true}
);
if(!updateMed){
   return res.status(404).json({error : "No update possible"})
}
res.status(200).json(updateMed);
}
module.exports= {addMedicine, updateMed};
