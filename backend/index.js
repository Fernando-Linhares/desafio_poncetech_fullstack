import express from "express";
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
import api from "./routes/api.js";
import auth from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/auth', auth);
app.use(api);

app.listen(3000, () => console.log('Application is running ... '));