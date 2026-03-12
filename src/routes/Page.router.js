import express  from 'express';
import { CreateProject, Getproject } from '../controler/Page.contoler.js';
import { upload } from '../../middleware/upload.js';



const router = express.Router();



router.get("/",Getproject)

router.post('/',upload.fields([
    { name: "image", maxCount: 5 }
  ]),CreateProject);
router.put("/:id",)
router.delete("/:id", )

export default router;
