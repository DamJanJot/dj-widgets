# 🧩 DJ Dashboard (React + Vite + TypeScript)

A lightweight dashboard template with a **sidebar navigation** and a **dashboard view** (tiles + charts).  
Built with **React, Vite, and TypeScript**, designed for quick prototyping and easy API integration.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build && npm run preview
```

---

## 📂 Project Structure

```
src/
 ├─ components/     # Cards & widgets
 ├─ pages/          # Dashboard + placeholders
 └─ services/
     └─ mock.ts     # Mock data (can be replaced with real API calls)
```

---

## 🔌 API Integration

Instead of using mocks from `services/mock.ts`, connect your own backend:

- Replace mock requests with real API calls (Laravel, Express, etc.)
- Use Vite environment variables (e.g. `VITE_API_URL`)
- Make sure your backend handles **CORS**

---

## ☁️ Deploy (Vercel)

1. Create a new project from this repo
2. Set build command:  
   ```bash
   npm run build
   ```
3. Set output directory:  
   ```
   dist
   ```

---

## 🛠 Tech Stack

- ⚡ [Vite](https://vitejs.dev/) — fast build tool
- ⚛ [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- 🎨 TailwindCSS (optional styling)
- 📊 Chart.js / Recharts (widgets & charts)

---

## 📜 License

MIT — feel free to use and modify.
