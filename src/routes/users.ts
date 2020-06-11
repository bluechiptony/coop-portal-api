import { Router } from "express";
import { createUser, getUsers } from "../handlers/users/users-adapter";

const UserRoutes = Router();

UserRoutes.post("/create-user", createUser);
UserRoutes.get("/get", getUsers);

export default UserRoutes;
