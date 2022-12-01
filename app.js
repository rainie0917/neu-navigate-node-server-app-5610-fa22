import mongoose from "mongoose"
import express from 'express'
import UsersController from "./users/users-controller.js";
import cors from 'cors'

const PORT = (process.env.PORT || 4000);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}

const MUSIC_CONNECTION_STRING = process.env.DB_MUSIC_CONNECTION_STRING || 'mongodb://localhost:27017/music'
mongoose.connect(MUSIC_CONNECTION_STRING, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log(`Connected successfully to: ${MUSIC_CONNECTION_STRING}`)
});

const app = express();
app.use(cors())
app.use(express.json())
UsersController(app)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))