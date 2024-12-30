import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {dbFunction} from './db/dbConnection';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
dbFunction();

//Db connection
/*
if(!process.env.MONGO_URL){
    throw new Error('Mongo URL is undefined.')
};

const connectionString: string = process.env.MONGO_URL;

mongoose.connect(connectionString);
const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});
  
database.once("connected", () => {
    console.log("Database Connected.");
});
*/

//Create server
const server = http.createServer(app);
const port = process.env.PORT || 3000;

app.get('/' , (req , res) => {
    res.send('Hello from ts.');
});

server.listen(port , ()=> {
    console.log('Server is listening.')
});

