const mongoose = require('mongoose')
console.log(process.env.DB_URL);
const connectDB = () => {
    mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then((data) => {
        console.log(`mongoDB connected with server ${data.connection.host}`);
    }).catch((er) => { console.log(er); })
}

module.exports = connectDB
