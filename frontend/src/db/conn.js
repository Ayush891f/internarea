
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

const db="mongodb+srv://ayushgupta68687:<ayushgupta>@cluster0.dckalvl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const local="mongodb://127.0.0.1:27017"
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then((conn) => {
    //console.log(conn);
    console.log("DB connection successfull");
}).catch((err) => {
    console.log("error occurred " + err);
});


