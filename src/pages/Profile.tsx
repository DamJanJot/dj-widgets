import { useEffect, useState } from "react";

interface User {
  imie: string;
  email: string;
  zdjecie_profilowe: string | null;
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  if (!user) return <p>Ładowanie...</p>;

  return (
    
    <div className="card">
        <div className="p-6 text-center">
          <h1 className="text-xl font-bold mb-4">Profil użytkownika</h1>
          <img
            src={
                user.zdjecie_profilowe
                ? `http://localhost:8000/${user.zdjecie_profilowe}`
                : "/dj-api/public/uploads/default.png"
                
            }
             
            alt="avatar"
            style={{ width: "96px", height: "96px", borderRadius: "50%" }}
            className="w-24 h-24 rounded-full mb-4"
            />
          <p><strong>Imię:</strong> {user.imie}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
    </div>
  );
}
