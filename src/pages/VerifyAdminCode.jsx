import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ADMIN_CODE = import.meta.env.VITE_ADMIN_SECRET;

export default function VerifyAdminCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      localStorage.setItem("adminVerified", "true");
      navigate("/admin");
    } else {
      setError("Invalid admin access code.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="Enter Admin Code" required value={code} onChange={(e) => setCode(e.target.value)} />
      {error && <p>{error}</p>}
      <button type="submit">Verify</button>
    </form>
  );
}