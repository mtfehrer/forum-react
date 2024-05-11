import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User";
import Post from "./models/Post";
import express, { NextFunction, Request, Response } from "express";

interface UserInterface extends mongoose.Document {
    username: string;
    password: string;
}

mongoose.connect("mongodb://localhost/app");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.post("/auth", async (req: Request, res: Response) => {
    const user: UserInterface | null = await User.findOne({
        username: req.body.username,
    });
    if (user) {
        if (user.password == req.body.password) {
            const accessToken = jwt.sign(
                { username: user.username },
                "secret key"
            );
            res.status(200).json({ accessToken: accessToken });
        } else {
            res.status(403).json({ status: "Account Denied" });
        }
    } else {
        res.status(404).json({ status: "User Not Found" });
    }
});

app.post("/create", async (req: Request, res: Response) => {
    try {
        await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(201).json({ status: "success" });
    } catch {
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

function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void | Response {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
    if (token) {
        jwt.verify(token, "secret key", (err, user) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                (req as any).user = user;
                next();
            }
        });
    } else {
        res.sendStatus(401);
    }
}

app.listen(5000, () => {
    console.log("Server running on: http://localhost:5000");
});
