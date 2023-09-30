const mongoose = require('mongoose')




const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DB_URI);

        console.log(`Server connected to database ${connection.host}`);
    } catch (error) {
        console.log("Some Error Occurred", error);
        process.exit(1);
    }
};
module.exports = connectDB