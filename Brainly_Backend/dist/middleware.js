import jwt from "jsonwebtoken";
import { Jwt_Key } from "./config.js";
export const auth = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ message: "You are not logged In" });
    }
    try {
        const decoded = jwt.verify(token, Jwt_Key);
        req.userId = decoded.id;
        next();
    }
    catch {
        res.status(403).json({ message: "Invalid token" });
    }
};
//# sourceMappingURL=middleware.js.map