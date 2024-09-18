import express from 'express';
import cors from 'cors'
import {connectToDatabase} from "./config/mongodb_client"
import appLogger from "./middleware/app_logger"
import userRouter from "./router/user_router";
import noteRouter from "./router/note_router";

const app : express.Application = express();

const hostName = "localhost";
const portNumber = 5001;

app.use(cors())
app.use(express.json())
app.use(appLogger)
app.use(express.urlencoded({extended:false}))
app.use("/v1/user",userRouter)
app.use("/v1/note",noteRouter)



app.get('/', (req, res) => {
    res.send('Welcome to the Note App Backend Service!');
});


app.listen(portNumber, async () => {
    try {
        await connectToDatabase(); // Pastikan koneksi berhasil sebelum menjalankan server
        console.log(`Server running on port ${portNumber}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Keluar jika koneksi ke MongoDB gagal
    }
});

