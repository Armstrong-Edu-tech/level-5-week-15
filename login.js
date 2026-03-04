import jwt from "jsonwebtoken";

const SECRET = "mysecretkey"; // use env in real apps

export default function handler(req, res) {
  const { email, password } = req.body;

  // Example users
  const users = [
    { email: "admin@test.com", password: "123", role: "admin" },
    { email: "user@test.com", password: "123", role: "user" },
  ];

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // Create JWT
  const token = jwt.sign({ email: user.email, role: user.role }, SECRET, { expiresIn: "1h" });

  res.status(200).json({ token });
}