const mongoose = require('mongoose')

const connectDB = () => {
    mongoose.connect("mongodb+srv://darshan:$$dar$$123@cluster0.ak2icim.mongodb.net/Student", { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`mongoDB connected with server ${data.connection.host}`);
    }).catch((er) => { console.log(er); })
}

module.exports = connectDB
