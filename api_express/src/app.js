import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import user from "./router/user/index.js";
import message from "./router/message/index.js";

const app = express();
//* Middleware pour analyser les corps de requêtes JSON
app.use(express.json());

//* Sert les fichiers statiques du dossier public
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "public")));

//* Route racine pour afficher index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

//* Définir les routes
app.use("/api/user", user);
app.use("/api", message);

export default app;
