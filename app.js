import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./src/routes/index.js"

dotenv.config()

const app = express()

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portfolio-frontend-drab-xi.vercel.app"
    ],
    methods: ["GET","POST","PUT","PATCH","DELETE"],
    credentials: true
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(router)

app.get("/", (req,res)=>{
  res.send("API running 🚀")
})

export default app