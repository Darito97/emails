import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const listOfAllowedOrigins = [
  process.env.URL1,
  process.env.URL2,
  process.env.URL3,
  process.env.URL4,
];

const corsOptions = {
  origin: [...listOfAllowedOrigins],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
