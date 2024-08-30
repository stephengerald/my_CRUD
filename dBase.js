const mongoose = require("mongoose")

const linkDB = async ()=>{
    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=> console.log("my MongoDB connected...!"))
}

module.exports = linkDB