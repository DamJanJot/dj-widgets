
# DJ Dashboard (React + Vite + TypeScript)

Lekki szkielet aplikacji z **panelem bocznym** i **widokiem dashboardu** (kafle + wykresy), wizualnie zbliżony do Twoich screenów.

## Szybki start
```bash
npm i
npm run dev
# produkcja
npm run build && npm run preview
```

## Struktura
```
src/
  components/      # karty + widżety
  pages/           # Dashboard + placeholdery
  services/mock.ts # mock danych (łatwo podmienisz na prawdziwe API)
```

## Podłączenie API
Zamiast mocków w `services/mock.ts` wstaw zapytania do Twojego back-endu (Laravel) lub publicznych API (pogoda, newsy).

- dla Vite używaj zmiennych środowiskowych `VITE_API_URL`
- obsługę CORS ogarnij po stronie API

## Deploy (Vercel)
- Utwórz projekt z tego repo
- Build Command: `npm run build`
- Output Directory: `dist`


## 🛠 Tech Stack

- ⚡ [Vite](https://vitejs.dev/) — fast build tool
- ⚛ [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- 🎨 TailwindCSS (optional styling)
- 📊 Chart.js / Recharts (widgets & charts)

---

## 📜 License

MIT — feel free to use and modify.
