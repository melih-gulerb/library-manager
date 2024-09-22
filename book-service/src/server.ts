import app from './app'
import { sequelize } from './config/mssql'

sequelize.authenticate().then(() => {
    console.log('DB connection is ensured')
}).catch((err) => {
    console.error('DB connection is refused', err)
})
app.listen(4000, () => {
    console.log(`Book-service server is running on port ${4000}`)
})