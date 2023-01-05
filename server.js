const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')
// config
dotenv.config({ path: "config/config.env" })

// connecting database
connectDB()


app.listen(process.env.PORT, () => {
    console.log(`server is runing on port:=${process.env.PORT}`);
})