require("dotenv").config();
const express = require("express");
const app = express();  
const cors = require("cors");
const connection = require("./db");


//database connection
connection();


// middleware
app.use(express.json());
app.use(cors());

const userRoute = require("./route/user.routs");
app.use("/api/auth",userRoute);



const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
