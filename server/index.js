import express from "express";
import cors from "cors";
import { MOCK_DATA } from "./data/MOCK_DATA.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use((req, res, next) => {
  setTimeout(next, 2000);
});

app.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const data = MOCK_DATA.slice(startIndex, endIndex);

  res.status(200).json({
    success: true,
    data: data,
    page: page,
    limit: limit,
    totalItems: MOCK_DATA.length,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
