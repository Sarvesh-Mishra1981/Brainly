import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Jwt_Key } from "./config.js";
import { ContentModel, Usermodel, LinkModel } from "./db.js";
import { auth } from "./middleware.js";
import { random } from "./hashGenerator.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        await Usermodel.create({ username, password });
        res.json({ message: "You are Signed Up" });
    }
    catch {
        res.status(411).json({ message: "User already exist" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await Usermodel.findOne({ username, password });
        if (!existingUser) {
            return res.status(403).json({ message: "Incorrect Credential" });
        }
        const token = jwt.sign({ id: existingUser._id }, Jwt_Key);
        return res.json({ token });
    }
    catch {
        return res.status(500).json({ message: "Server error" });
    }
});
app.post("/api/v1/content", auth, async (req, res) => {
    const { link, type, title } = req.body;
    await ContentModel.create({
        title,
        link,
        type,
        userid: req.userId,
        tags: []
    });
    return res.json({ message: "Content added" });
});
app.get("/api/v1/content", auth, async (req, res) => {
    const userId = req.userId;
    const content = await ContentModel.find({ userid: userId }).populate("userid", "username");
    res.json({ content });
});
app.delete("/api/v1/content", auth, async (req, res) => {
    const { contentId } = req.body;
    await ContentModel.deleteMany({ _id: contentId, userid: req.userId });
    res.json({ message: "Content deleted" });
});
app.post("/api/v1/share", auth, async (req, res) => {
    const { share } = req.body;
    if (share) {
        const existingLink = await LinkModel.findOne({ userId: req.userId });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = random(10);
        await LinkModel.create({ userId: req.userId, hash });
        res.json(hash);
    }
    else {
        await LinkModel.deleteOne({ userId: req.userId });
        res.json({ message: "Deleted Link" });
    }
});
app.get("/api/v1/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    const link = await LinkModel.findOne({ hash });
    if (!link) {
        res.status(404).json({
            message: "Invalid Link"
        });
    }
    const content = await ContentModel.find({ userid: link?.userId });
    const user = await Usermodel.findOne({ _id: link?.userId });
    if (!user) {
        res.status(404).json({
            message: "No user found"
        });
        return;
    }
    res.json({
        username: user.username,
        content
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map