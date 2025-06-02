import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { hashPassword, comparePassword } from "../utils/password.util.js";

const userSchema = mongoose.Schema(
  {
    prenom: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'], //* Définir les rôles possibles
      default: 'user', //* Valeur par défaut pour les nouveaux utilisateurs
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timestamps: { createdAt: true } }
);

// Plugin pour garantir l'unicité des champs marqués comme `unique`
userSchema.plugin(mongooseUniqueValidator);

// Middleware pour hasher le mot de passe avant de sauvegarder
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); //* Si le mot de passe n'est pas modifié, passer au middleware suivant
  };

  try {
    this.password = await hashPassword(this.password);
    next(); //* Continuer après avoir hashé le mot de passe
  } catch (error) {
    next(error); //* En cas d'erreur, passer l'erreur au gestionnaire
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
  return comparePassword(candidatePassword, this.password);
};

export default mongoose.model('User', userSchema)
