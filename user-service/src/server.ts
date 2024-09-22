import app from './app'
import { sequelize } from './config/mssql'

sequelize.authenticate().then(() => {
    console.log('MSSQL connection successfully established.')
    app.listen(3000, () => {
        console.log(`Server is running on port ${3000}`)
    })
}).catch((err) => {
    console.error('MSSQL database is refused', err)
})