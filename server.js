require('dotenv').config({path:'./config.env'})
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require("./middleware/error");

connectDB()

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error : ${err}`)
    server.close(() => process.exit(1))
})