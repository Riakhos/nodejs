import express from 'express'
import { env } from './config/index.js'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import cors from "cors";

// ROUTES
import userRoutes from './routes/user.router.js'
import avisRouter from './routes/avis.router.js'
import articleRouter from './routes/article.router.js'


// APP EXPRESS
const app = express()

// PORT
const PORT = env.PORT || 8080

// DATABASE MONGOOSE
mongoose
  .connect(env.MONGO_URI, {dbName: env.DB_NAME})
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(error => console.log(error))

// MIDDLEWARE
app.use(cookieParser());
app.use(express.json());

// Configuration CORS
const corsOptions = {
  origin: 'http://localhost:3000', // L'origine de votre frontend
  credentials: true, // Permet l'envoi de cookies (token JWT)
}

app.use(cors(corsOptions))

// PREFIX ROUTES
app.use("/api/user", userRoutes)
app.use("/api/article", articleRouter)
app.use("/api/avis", avisRouter)


// SERVER 
app.listen(PORT, () => {
  console.log(`LISTENING AT http://localhost:${PORT}`)
})