import { useEffect, useState } from "react";
import { db } from "../auth/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const approveUser = async (id) => {
    await updateDoc(doc(db, "users", id), { approved: true });
    setUsers(users.map(u => u.id === id ? { ...u, approved: true } : u));
  };

  return (
    <div>
      <h1>Admin Approval Panel</h1>
      {users.map(user => (
        <div key={user.id}>
          <p>{user.email} — {user.approved ? "Approved" : "Pending"}</p>
          {!user.approved && <button onClick={() => approveUser(user.id)}>Approve</button>}
        </div>
      ))}
    </div>
  );
}