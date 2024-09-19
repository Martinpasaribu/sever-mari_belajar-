import express from 'express';
import cors from 'cors';
import { connectToDatabase } from "./config/mongodb_client";
import appLogger from "./middleware/app_logger";
import userRouter from "./router/user_router";
import noteRouter from "./router/note_router";

const app: express.Application = express();

const hostName = "localhost";
const portNumber = 5001;

app.use(cors());
app.use(express.json());
app.use(appLogger);
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Welcome to the Note App Backend Service!');
});

// Router yang digunakan untuk endpoint lainnya
app.use("/v1/user", userRouter);
app.use("/v1/note", noteRouter);

// Pastikan koneksi ke MongoDB sebelum menjalankan server
const startServer = async () => {
    try {
        // Hubungkan ke MongoDB terlebih dahulu
        await connectToDatabase();
        console.log('Successfully connected to MongoDB');
        // Jalankan server hanya setelah koneksi ke MongoDB berhasil
        app.listen(portNumber, () => {
            console.log(`Server running on http://${hostName}:${portNumber}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Keluar dari proses jika koneksi ke MongoDB gagal
    }
};

// Panggil fungsi untuk menjalankan server
startServer();
