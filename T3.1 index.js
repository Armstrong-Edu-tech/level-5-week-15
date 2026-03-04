import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const SECRET = "mysecretkey"; // same as API

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // get token from storage
    if (!token) return;

    try {
      const decoded = jwt.verify(token, SECRET);
      if (decoded.role === "admin") router.push("/admin");
      else router.push("/dashboard");
    } catch (err) {
      console.log("Invalid or expired token");
      localStorage.removeItem("token");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>Redirecting based on role...</p>
    </div>
  );
}
