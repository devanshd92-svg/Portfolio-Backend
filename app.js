import express from  "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./src/routes/index.js"
// import routes from "./src/routes/Page.router.js"
const app = express()

dotenv.config()
const port = process.env.PORT || 4000

const corsOptions={
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","PATCH","HEAD","DELETE"]
}
app.use(cors(corsOptions))

app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(router)



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))