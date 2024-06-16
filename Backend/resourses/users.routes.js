import express from "express";

// Import handlers  from users.controller.js
import {getUser, createUser, editUser, deleteUser, getUsers, account, logIn, logOut} from "./users.controllers.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// GET /users: Retrieve a list of users.
// POST /users: Create a new user.
// GET /users/{userId}: Retrieve a specific user by ID.
// PUT /users/{userId}: Update a specific user by ID.
// DELETE /users/{userId}: Delete a specific user by ID.


// CRUD for users
router.post("/register", createUser)
router.post("/login", logIn)
router.get("/users/:id", getUser);
router.put("/users/:id", auth, editUser);
router.delete("/users/:id", auth, deleteUser);
router.get("/users", auth, getUsers);
router.get("/account", auth, account)
router.post('/logout', auth, logOut)

  // En protected route
  router.get("/protected", auth ,(req, res) => {
    res.send("The user it authenticated and can access this route")
  })


export default router;