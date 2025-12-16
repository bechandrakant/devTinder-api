import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
