import express  from 'express';
import { createUser, getUserById } from '../controler/User.controler.js';
import { upload } from '../../middleware/upload.js';





const router = express.Router();


// router.get('/', home);
router.get("/:id",getUserById)
router.post('/', upload.fields([
    { name: "image", maxCount: 5 },
    { name: "resume", maxCount: 1 }
  ]), createUser);
router.put("/:id",)
router.delete("/:id", )

export default router;
