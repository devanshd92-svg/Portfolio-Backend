import express from 'express';
import Pagerouter from "./Page.router.js"
import Userrouter from "./User.router.js"

const router = express.Router();

router.use("/api/Project",Pagerouter)
router.use("/api/User",Userrouter)

 export default  router;
