import cloudinary from "../../config/cloudinary.js";
import prisma from "../../config/dbconnect.js";
import fs from "fs";

export const Getproject=async(req, res)=>{

try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

export const CreateProject= async(req,res)=>{
try {

     console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    const { title, description,tech } = req.body;
     
const techArray = JSON.parse(tech); 

    const imageFiles = req.files.image || [];
        const imageUrls = [];
    
        for (const file of imageFiles) {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "Project/images",
          });
    
          imageUrls.push(result.secure_url);
    
          fs.unlinkSync(file.path); // delete local file
        }


    const project = await prisma.project.create({
      data: {
        title,
        description,
        image:imageUrls ,
      
       
        tech:techArray,
      },
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}