import "dotenv/config";
import express from "express";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";

import authRoutes from "./routes/authRouter.js";

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    console.log(process.env.GITHUB_CLIENT_ID);
    console.log(process.env.GITHUB_CLIENT_SECRET);
    res.json({ message: "reached /" });
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Listening on PORT ${PORT}`);
});
