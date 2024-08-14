"use client"; // Ensure this component is treated as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/login/login.module.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the credentials match
    if (username === "huawei" && password === "admin") {
      // Redirect to /dashboard on successful login
      router.push("/dashboard");
    } else {
      // Set error message on failed login
      setError("Invalid username or password");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
