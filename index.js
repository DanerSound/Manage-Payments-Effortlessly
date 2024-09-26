const express = require('express');
const app = express();
const port = 3000;
const Traceur = require('./models/traceurs.model.js');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false})); // per potere decodificare cose da form


mongoose.connect("...") // connect to mongoDB
    .then(() => {
        console.log('MongoDB Connected!');
        app.listen(
            port,
            () => console.log(`Listening on port ${port}`),
        )
    }).catch(() => {
    console.log('MongoDB Fail! Connected!');
})

app.get('/',(req, res) =>{
    res.send("hello from api!")
})

app.post('/api/addTraceurs', async (req,res)=>{
    try{
        const Student = await Traceur.create(req.body);

    }catch(error){
        res.status(500).json({message:error.message})
    }
});

app.get('/api/Traceurs', async (req, res) => {
    try {
        const Students = await Traceur.find({});
        res.status(200).json(Students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/Traceur/:id',  async (req, res)=> {
    try {
        const {id} = req.params;
        const Student = await Traceur.findById(id);
        res.status(200).json(Student);
    }catch (error){
        res.status(500).json({ message: error.message });
    }
});

// update a data student
app.put('/api/product/:id', async (req, res) => {
   try{
        const {id} = req.params;
        const Student = await Traceur.findByIdAndUpdate(id, req.body)
        if(!Student){
            res.status(404).json({ message: " Traceur non trovato!" });
        }
        const StudentUpdated = await Traceur.findById(id, req.body)
        res.status(200).json(StudentUpdated);
   }catch(error){
    es.status(500).json({ message: error.message });
   } 
});