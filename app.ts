import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { mongoDB } from "./src/utils/db";
import helmet from "helmet";
import routes from './src/routes/index';

dotenv.config();
mongoDB.connect();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(routes)

app.listen(PORT, () => {
    console.log(`⚡️ Listening on port ${PORT}`);
});