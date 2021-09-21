import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(express.static("public"));
app.use(express.static("bin"));
app.use(cors());

const PORT = process.env["PORT"] || 3000;

// route: @post[/login]
app.get("/", (req, res) => {
    const file = fs.readFileSync("public/index.html");
    res.end(file);
});

// server initialization
app.listen(PORT, async () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})