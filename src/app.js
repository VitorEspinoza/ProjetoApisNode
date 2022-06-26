import express  from "express";
import db from "./backend/config/dbConnect.js";


db.on("error", console.log.bind(console, 'Erro de Conexão'));
db.once("open",() => {
    console.log("conexão com o banco feita com sucesso")
});

const app = express();
app.use(express.json())


export default app;