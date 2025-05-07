import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

const ADMIN_EMAIL = "akhimienfriday.1228@gmail.com";

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setStatus("unauthorized");
        return;
      }

      if (user.email === ADMIN_EMAIL) {
        setAuthorized(true);
      } else {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists() && docSnap.data().approved) {
          setAuthorized(true);
        }
      }

      setStatus("done");
    });

    return unsub;
  }, []);

  if (status === "loading") return <div>Loading...</div>;
  if (!authorized) return <div>Access denied. Await admin approval.</div>;
  return children;
}