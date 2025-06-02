import { Router } from "express";
import jwt from "jsonwebtoken";
import User from "../../models/user.model.js";

const router = Router();

// Route de connexion sans bcrypt
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("Tentative de connexion :", email, password);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }
        // Vérification du mot de passe en clair (non sécurisé)
        if (password !== user.password) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }
        // Génération du token JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );
        // Connexion réussie
        res.json({
            message: "Connexion réussie !",
            user: {
                email: user.email,
                lastname: user.lastname,
                firstname: user.firstname,
                _id: user._id
            },
            token // <-- renvoie le token ici
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;