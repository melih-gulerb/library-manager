import express from 'express'
import userRoutes from './routes/bookRoutes'
import dotenv from 'dotenv'
import {errorHandler} from "./middlewares/errorHandling";

dotenv.config()

const app = express()

app.use(errorHandler)
app.use(express.json())

app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send('book-service is healthy')
})

export default app
