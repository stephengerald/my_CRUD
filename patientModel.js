const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema({
    fullName: {type: String},
    age: {type: Number},
    email: {type: String, require: true}
})

const Patients = new mongoose.model("Patient", patientSchema)

module.exports = Patients