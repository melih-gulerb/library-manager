import express from 'express'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.send('healthy')
})

export default app
