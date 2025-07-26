import express from "express";
import userRoute from "./routes/userRoute";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Express Prisma API</h1>");
});

app.use(express.json());
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
