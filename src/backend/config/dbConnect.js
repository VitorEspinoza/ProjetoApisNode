import mongoose from "mongoose";

mongoose.connect("mongodb+srv://projetocompasso:projeto123@cluster0.eefm25l.mongodb.net/ProjetoNode-Compasso");

let db = mongoose.connection;

export default db;

