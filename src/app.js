import express  from "express";
import db from "./config/dbConnect/dbConnect.js";

const app = express();
app.use(express.json())
