// data/users.js
import bcrypt from "bcryptjs";

export const users = [
  {
    id: 1,
    username: "student1",
    password: bcrypt.hashSync("mypassword", 10), // hashed password
  },
];
