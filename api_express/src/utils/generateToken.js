import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../../src/models/user.model.js";

dotenv.config({ path: "../../.env" });

// Connexion à la base de données MongoDB
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log("Connecté à MongoDB"))
    .catch((err) => console.log(err));

// Liste des utilisateurs pour lesquels nous voulons générer des tokens
const users = [
    {
        _id: "67404d6e107ce10c4153dfc3",
        email: "marcelpagnol@gmail.com",
    },
    {
        _id: "674050a0107ce10c4153dfc6",
        email: "virginiepagnol@gmail.com",
    },
    {
        _id: "6740510d107ce10c4153dfc9",
        email: "françoispagnol@gmail.com",
    },
    {
        _id: "6740512c107ce10c4153dfcb",
        email: "thierrypagnol@gmail.com",
    },
];

// Fonction pour générer le token JWT
const generateTokens = async () => {
    for (const user of users) {
        try {
            //* Trouver l'utilisateur dans la base de données via son email
            const foundUser = await User.findOne({ email: user.email });

            if (!foundUser) {
                console.log(`Utilisateur non trouvé pour l'email: ${user.email}`);
                continue;
            }

            //* Créer un payload avec l'ID de l'utilisateur
            const payload = { id: foundUser._id };

            //* Générer le token JWT
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "10h",
            });

            console.log(
                `Token généré pour ${foundUser.firstname} ${foundUser.lastname} : ${token}`
            );
        } catch (error) {
            console.error("Erreur lors de la génération du token", error);
        }
    }
};

generateTokens();
