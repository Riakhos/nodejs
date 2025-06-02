import express from "express"
import getMessage  from "./get_message.js"
import postMessage from "./post_message.js"
import putMessage from "./put_message.js"
import deleteMessage from "./delete_message.js"

const router = express.Router();

router.use("/message", getMessage)
router.use("/message", postMessage)
router.use("/message", putMessage)
router.use("/message", deleteMessage)

export default router