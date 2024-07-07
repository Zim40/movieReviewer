import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors"; //test hmr
const port = process.env.PORT || 5000;
import connectDb from "./config/connection.js";
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(cors());

app.use('/api', routes);

// app.use(routes);
// app.use(authMiddleware);
app.get("/message", (req, res) => {
  res.send({ message: "Hello message" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server.js Error handling Ln: 24" });
});

connectDb()
  .then(async () => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error starting server connection", err.message);
  });
