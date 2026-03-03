// pages/api/protected.js
import jwt from "jsonwebtoken";

export default function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ message: "Welcome to protected content!", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
}
