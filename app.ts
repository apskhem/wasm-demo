import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.static("static"));
app.use(express.static("pkg"));
app.use(cors());

const PORT = process.env.PORT || 3000;

// route: @post[/login]
app.get("/", (req, res) => {
    res.end(fs.readFileSync("static/index.html"));
});

// server initialization
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})