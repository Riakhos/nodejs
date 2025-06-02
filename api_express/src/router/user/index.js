import express from "express";
import getUser  from "./get_user.js";
import postUser from "./post_user.js";
import putUser from "./put_user.js";
import deleteUser from "./delete_user.js";
import login from "./login.js";

const router = express.Router();

router.use("/", getUser);
router.use("/", postUser);
router.use("/", putUser);
router.use("/", deleteUser);
router.use("/", login);

export default router;