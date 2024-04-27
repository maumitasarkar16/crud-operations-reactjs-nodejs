import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import basicFormRoute from "./routes/basicFormRoute.js"; 

dotenv.config();
const app = express();

const uri = process.env.DB_URI;

app.use(express.json());
//app.use(cors);  //comment this line in local 
app.use(bodyParser.json());

app.use("/api/basicForm", basicFormRoute)

app.get('/', (req, res) => {
    console.log("Welcome")
    res.send('Welcome to my server!');
});

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));

app.listen(8001, () => {
    console.log("server running on 8001")
})

//Make sure to choose get/post in postman properly