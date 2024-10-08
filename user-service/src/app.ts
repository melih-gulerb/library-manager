import express from 'express'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'
import {errorHandler} from "./middlewares/errorHandling";

dotenv.config()

const app = express()

app.use(express.json())
app.use('/', userRoutes)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('user-service is healthy')
})
export default app
