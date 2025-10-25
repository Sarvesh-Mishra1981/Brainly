import mongoose, { model, Schema } from "mongoose";
mongoose.connect("mongodb+srv://sarveshmishraiit1981_db_user:etKy7CykTtMXyCC9@cluster0.6i8vprh.mongodb.net/");
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String
});
export const Usermodel = model("user", UserSchema);
const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
    userid: { type: mongoose.Types.ObjectId, ref: "user", required: true }
});
export const ContentModel = model("content", ContentSchema);
const LinkSchema = new Schema({
    hash: String,
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true }
});
export const LinkModel = model("Link", LinkSchema);
//# sourceMappingURL=db.js.map