import prisma from "../../config/dbconnect.js";
import { UserSchema } from "../../validations/UserValidation.js";
import logger from "../../config/logger.js";
import winston from "winston";
import vine from "@vinejs/vine";
import fs from "fs";
import cloudinary from "../../config/cloudinary.js";

const {error} = winston

export const createUser = async (req, res) => {
  try {
    //  console.log("BODY:", req.body);
    // console.log("FILES:", req.files);
//         console.log(req.files.image);   // images array
// console.log(req.files.resume);  // resume array

    const UserValidator = vine.compile(UserSchema);

      const payload = await UserValidator.validate(req.body);

      const existingUser = await prisma.user.findUnique({

        where: { email: payload.email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

   const imageFiles = req.files.image || [];
    const imageUrls = [];

    for (const file of imageFiles) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "users/images",
      });

      imageUrls.push(result.secure_url);

      fs.unlinkSync(file.path); // delete local file
    }

    // Upload Resume
    let resumeUrl = null;

if (req.files.resume && req.files.resume.length > 0) {
  const resumeFile = req.files.resume[0];


  if (resumeFile.mimetype !== "application/pdf") {
    return res.status(400).json({ message: "Only PDF files allowed" });
  }

  try {
  const result = await cloudinary.uploader.upload(resumeFile.path, {
  folder: "users/resume",
   resource_type: "auto",
  use_filename: true,
  unique_filename: true
});

    resumeUrl = result.secure_url;

 console.log(result);
    // Use async unlink to prevent blocking the event loop
   fs.unlink(resumeFile.path, (err) => {
  if (err) console.log("Delete error:", err);
});
  } catch (uploadError) {
    console.error("Cloudinary Upload Error:", uploadError);
    // Handle upload error specifically if needed
  }
}


    const user= await prisma.user.create({
  data: {
    ...payload,
    image: imageUrls ,
    resume: resumeUrl
  }
});

  return res.status(201).json({
      message: "User created successfully",
      data: user
    });
  } catch (err) {
   console.log("FULL ERROR 👉", err);
  console.log("STACK 👉", err.stack);

    if (err.messages) {
      return res.status(400).json({
        success: false,
        errors: err.messages
      });
    }

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const getUserById = async (req, res) => {
  try {

     const { id } = req.params;

   
    if (!id) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      message: "User fetched successfully",
      data: user
    });
  } catch (err) {
    logger.error(err?.message);
    return res.status(500).json({
      message: err.message || "Internal server error"
    });
  }
};