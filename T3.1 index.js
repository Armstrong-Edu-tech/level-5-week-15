import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Example role
    const userRole = "user"; // or "user"

    if (userRole === "admin") {
      router.push("/admin");
    } else if (userRole === "user") {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <p>Redirecting based on role...</p>
    </div>
  );
}
