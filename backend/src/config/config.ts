import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rvdzrbx.mongodb.net/miss-cohen`

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

export const config = {
    mongo:{
        url: MONGO_URL
    },
    server:{
        port: SERVER_PORT
    }
}
