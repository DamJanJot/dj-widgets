import { useEffect, useState } from "react";

export default function EditProfile() {
  const [form, setForm] = useState({
    imie: "",
    email: "",
    zdjecie_profilowe: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/me", { credentials: "include" })
      .then((res) => res.json())
      .then((data) =>
        setForm({
          imie: data.imie,
          email: data.email,
          zdjecie_profilowe: data.zdjecie_profilowe || "",
        })
      );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/profile/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    alert("Profil zaktualizowany!");
  };

  return (
    <div className="card p-6">
      <h1 className="text-xl font-bold mb-4">Edytuj profil</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          name="imie"
          value={form.imie}
          onChange={handleChange}
          placeholder="Imię"
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="zdjecie_profilowe"
          value={form.zdjecie_profilowe}
          onChange={handleChange}
          placeholder="Ścieżka do avatara"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Zapisz
        </button>
      </form>
    </div>
  );
}
