import express from 'express'
import cors from 'cors'
import connectToMongooseDB from './db/db.js'

import authRouter from './routes/auth.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)

app.listen(5000, () => {
    connectToMongooseDB()
    console.log("server is running")
})