import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ message: "reached /" });
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Listening on PORT ${PORT}`);
});
