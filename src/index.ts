import express from "express";
import userRoute from "./routes/userRoute";
import { seedDatabase } from "./controllers/seedController";

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Express Prisma API</h1>");
});

// Seed route
app.post("/seed", seedDatabase);

// API routes
app.use("/users", userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
