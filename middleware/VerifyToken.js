// middleware/VerifyToken.js
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;
  console.log("AUTH HEADER:", authHeader); // 🔍 log token

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Akses ditolak" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    req.userId = decoded.id;
    next();
  });
};
