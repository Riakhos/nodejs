import dotenv from 'dotenv'

dotenv.config()

export const env = {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,
	TOKEN: process.env.TOKEN,
	DB_NAME: process.env.DB_NAME
}