import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export default function handler(req, res) {
  const authHeader = req.headers.authorization;

  if (!authHeader ) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // ✅ JWT verified directly here
    const decoded = jwt.verify(token, SECRET);

    res.status(200).json({
      message: "Secure data accessed",
      user: decoded,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
