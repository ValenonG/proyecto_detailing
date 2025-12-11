import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db'
import router from "./routes"

dotenv.config()
connectDB()
const app = express()

const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is ON')
})

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port 3000`)
})
