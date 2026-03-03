// export default function handler(req, res) {
// if(req.method==='POST'){
//     const { email, password } = req.body;

//      if (email === "test@test.com" && password === "123456") {
//       return res.status(200).json({ message: "Login successful" });
//     }

//     return res.status(401).json({ message: "Invalid credentials" });
// }
// res.status(405).json({ message: "Method Not Allowed" });
// }

// pages/api/login.js
import jwt from "jsonwebtoken";
import { users } from "../../data/users";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { username, password } = req.body;

  // Find user
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Check password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

  // Make token
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expires in 1 hour
  );

  res.status(200).json({ token });
}
