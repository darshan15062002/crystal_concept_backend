const mongoose = require('mongoose')
DB_URL = 'mongodb+srv://darshan:$$dar$$123@cluster0.ak2icim.mongodb.net/Student'
const connectDB = () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifideTopology: true, useCreateIndex: true }).then((data) => {
        console.log(`mongoDB connected with server ${data.connection.host}`);
    }).catch((er) => { console.log(er); })
}

module.exports = connectDB
