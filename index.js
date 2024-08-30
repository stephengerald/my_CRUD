const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

const linkDB = require("./dBase")
const Patients = require("./patientModel")


dotenv.config()

const autoService = express()
 
// Middleware

autoService.use(express.json())

const PORT = process.env.PORT || 7000

linkDB()

//listen
autoService.listen(PORT, ()=>{
    console.log(`The server is now running on PORT ${PORT}`)
})

autoService.post("/add_User", async (req, res)=>{
    const { fullName, age, email } = req.body

    if(!fullName || fullName.length < 3){
        return res.status(400).json({msg: "Please add your name. Name should be greater than three characters"})
    }

    const newPatient = new Patients({fullName, age, email})
    await newPatient.save()

    return res.status(200).json({msg: "User saved successfully", client: newPatient})
})

autoService.post("/update_email", async (req, res)=>{
    const { fullName, email} = req.body

    if(!fullName || fullName.length < 3) {
        return res.status(400).json({msg: "Please add your name. Name should be greater than three characters"})
    }

    if(!email){
        return res.status(400).json({msg: "Please add your email"})
    }

    const alreadyExist = await Patients.findOne({ email })

    if(alreadyExist){
        return res.status(400).json({msg: "This email already exist"})
    }

    const newPatient = new Patients({fullName, email})
    await newPatient.save()

    return res.status(200).json({msg: "User saved successfully", client: newPatient})

})

autoService.post("/add-users", async (req, res)=>{
    const {fullName, age, email} = req.body

    if(!fullName || fullName.length < 3) {
        return res.status(400).json({msg: "Please add your name. Name should be greater than three characters"})
    }

    if(age < 18 || age > 99){
        return res.status(400).json({msg: "Your age should be between 18 and 99. Enter your age again"})
    }

    if(!email){
        return res.status(400).json({msg: "Please add your email"})
    }

    const alreadyExist = await Patients.findOne({ email })

    if(alreadyExist){
        return res.status(400).json({msg: "This email already exist"})
    }

    const newPatient = new Patients({fullName, age, email})
    await newPatient.save()

    return res.status(200).json({msg: "User saved successfully", client: newPatient})

})





autoService.use((req, res)=>{
    res.status(404).json({msg: "This endpoint does not exist yet"})
})
