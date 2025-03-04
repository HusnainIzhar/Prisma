import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./controller/user";
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/user", createUser);
app.get("/all", getAllUsers);
app.get("/user/:id", getUserById);
app.put("/user/:id", updateUser);
app.delete("/user/:id", deleteUser);
