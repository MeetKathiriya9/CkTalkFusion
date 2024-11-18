import express from "express";
import { AddUser, getAllUser, getUserData, getUsersname, login } from "../Controller/auth.controller.js";

const Auth = express.Router();

Auth.post("/add",AddUser);
Auth.post("/login",login);
Auth.get("/getusers",getAllUser);
Auth.get("/getuserdata/:email",getUserData);
Auth.get("/getusersname/:id",getUsersname);

export default Auth;