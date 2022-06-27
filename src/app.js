import express  from "express";
import db from "./backend/config/dbConnect.js";
import routes from "./backend/routes/index.js";
import cors from "cors";

db.on("error", console.log.bind(console, 'Erro de Conexão'));
db.once("open",() => {
    console.log("conexão com o banco feita com sucesso")
});

const app = express();
app.use(
    cors({origin: '*'}),
    express.json()
)

routes(app);

export default app;