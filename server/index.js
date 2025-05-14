import express from 'express'
import cors from 'cors'
import connectToMongooseDB from './db/db.js'
import questionRouter from './routes/questions.js';
import answerRouter from './routes/answers.js';
import authRouter from './routes/auth.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/questions', questionRouter)
app.use('/api/answers', answerRouter)

app.listen(5000, () => {
    connectToMongooseDB()
    console.log("server is running")
})