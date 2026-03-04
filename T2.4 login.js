import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET = "process.env.JWT_SECRET";

// Simulated user (replace with DB later)
const user = {
  id: 1,
  email: "admin@test.com",
  password: bcrypt.hashSync("123456", 10),
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (email !== user.email) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // ✅ JWT created directly here
  const token = jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Login successful",
    token,
  });
}
