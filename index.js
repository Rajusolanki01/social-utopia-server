import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import path from "path";

//* security packages
import helmet from "helmet";
import dbConnection from "./dbConfig/dbConnect.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import authRoute from "./routes/authRoutes.js";
import postRoute from "./routes/postRoutes.js";
import userRoute from "./routes/userRoutes.js";

const __dirname = path.resolve(path.dirname(""));

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, "views/build")));

const PORT = process.env.PORT || 8800;

dbConnection();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("common"));
app.use("/auth", authRoute); //* All API Routes
app.use("/posts", postRoute); //* All API Routes
app.use("/users", userRoute); //* All API Routes

//* error middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.status(200).send("OK From Server...");
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
