import express from "express";
import connectDB from "./config/db.js";
import flightRouter from "./routes/flights.js";
import userRouter from "./routes/userauth.js";

const app = express();

connectDB().then(() => {
    app.use(express.json());

    app.use('/api/flights/', flightRouter);
    app.use('/api/users', userRouter);

    const PORT = 3000 || process.env.PORT;

    app.listen(PORT, () => {
        console.log(`Server started on ${PORT}`);
    });
});

