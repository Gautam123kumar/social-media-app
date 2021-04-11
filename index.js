const express = require('express');
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authUser = require("./routes/auth");
const app = express();
dotenv.config();


// Database Connection
//const url ='mongodb://localhost/socialmediaapp';
mongoose.connect(process.env.MONGO_CONNECTION_URL,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:true
    });
    
    const connection = mongoose.connection;
    connection.once('open',()=>{
        console.log('Database Connnected...');
    }).catch(err=>{
        console.log('Connection filed...')
    });
// middleware
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users",userRoute);
app.use("/api/auth",authUser);


app.listen(8800,()=>{
    console.log("Backend server is running")
})