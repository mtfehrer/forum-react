import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";
import express from "express";
config();
mongoose.connect("mongodb://" + process.env.DB_DOMAIN + "/app?directConnection=true");
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.post("/auth", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    });
    if (user) {
        if (user.password == req.body.password) {
            const accessToken = jwt.sign({ username: user.username }, "secret key");
            res.status(200).json({ accessToken: accessToken });
        }
        else {
            res.status(403).json({ status: "Account Denied" });
        }
    }
    else {
        res.status(404).json({ status: "User Not Found" });
    }
});
app.post("/create", async (req, res) => {
    try {
        await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(201).json({ status: "success" });
    }
    catch {
        res.status(500).json({ status: "error" });
    }
});
app.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});
app.post("/createpost", authenticateToken, async (req, res) => {
    const d = new Date();
    let date = d.toISOString().substring(0, 10);
    const post = await Post.create({
        title: req.body.title,
        username: req.body.username,
        content: req.body.content,
        date: date,
    });
    res.status(201).json({ status: "success" });
});
function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            }
            else {
                req.user = user;
                next();
            }
        });
    }
    else {
        res.sendStatus(401);
    }
}
app.listen(process.env.PORT, () => {
    console.log("Server running on: " +
        process.env.PROTOCOL +
        "://" +
        process.env.DOMAIN +
        ":" +
        process.env.PORT);
});
//# sourceMappingURL=app.js.map