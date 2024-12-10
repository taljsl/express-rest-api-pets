// setup
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors');
// schema imports
const Pet = require('./models/pet.js')




mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

app.use (express.json())
app.use(cors());

// app.get("/", async (req, res) => {
//     res.render("home.ejs");
//   });


app.get('/pets', async (req,res) => {
    const foundPets = await Pet.find()
    res.json(foundPets)
})


app.get("/new", (req, res) => {
    res.render("new.ejs");
  });  


app.delete('/pets/:petId', async (req,res) => {
    const deletedPet = await Pet.findByIdAndDelete(req.params.petId)
    res.json(deletedPet)
})

app.put('/pets/:petId', async(req,res) => {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body,{new:true})
    res.json(updatedPet)
})


app.listen(3001, () => {
    console.log('The Express app is ready')
})