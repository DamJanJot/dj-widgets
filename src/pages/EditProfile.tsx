import { FormEvent, useState } from 'react'

export default function EditProfile() {
  const [form, setForm] = useState({
    name: 'Damian',
    email: 'damian@example.com',
    location: 'Warszawa',
    role: 'Administrator',
  })
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <section className="page-shell">
      <h1 className="page-title">Edytuj profil</h1>

      <div className="card form-card">
        <form onSubmit={handleSubmit} className="settings-form">
          <label>
            Imię
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </label>
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label>
            Lokalizacja
            <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </label>
          <label>
            Rola
            <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
          </label>

          <div className="form-footer">
            {saved && <span className="up">Zapisano lokalne zmiany.</span>}
            <button type="submit" className="button-like primary">Zapisz</button>
          </div>
        </form>
      </div>
    </section>
  )
}
