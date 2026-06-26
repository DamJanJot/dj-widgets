# Orbitum Dashboard

Panel webowy zbudowany w React, Vite i TypeScript. Aplikacja działa jako rozbudowany dashboard demo z widokami pogody, kalendarza, planu dnia, aktualności, rynków, profilu i ustawień.

Projekt jest obecnie rozwijany wizualnie i funkcjonalnie. Integracja z docelową bazą danych jest świadomie odłożona, żeby nie psuć stabilnej wersji demo.

## Funkcje

- Dashboard z godziną, datą, wschodem i zachodem słońca.
- Pogoda dla Warszawy oraz kompaktowa prognoza 5 dni.
- Kalendarz miesięczny z polskimi świętami, zaznaczaniem dnia i własnymi wydarzeniami.
- Plan dnia z fokusem, zadaniami z notatek, dzisiejszymi wydarzeniami i harmonogramem.
- Aktualności RSS oraz osobna lista wiadomości o działaniach zbrojnych.
- Rynki: złoto, waluty i krypto.
- Przełączanie motywu: ciemny, jasny, systemowy.
- Konfigurowalny sidebar: widoczność i kolejność paneli zapisywana lokalnie.
- Profil, edycja profilu, ustawienia, centrum operacyjne i repository.
- Lokalne notatki i zadania jako osobny panel.
- Szybka nawigacja z topbara oraz zapamiętywanie ostatnio odwiedzanych widoków.

## Dane i tryb demo

Aplikacja korzysta z kilku publicznych API:

- OpenWeatherMap dla pogody i prognozy.
- NBP dla kursów walut i ceny złota.
- CoinGecko dla krypto.
- RSS2JSON jako pośrednik dla kanałów RSS.

Część ustawień użytkownika jest zapisywana w `localStorage`, między innymi:

- motyw,
- konfiguracja sidebaru,
- ostatnio odwiedzane widoki,
- wydarzenia w kalendarzu,
- fokus i harmonogram dnia,
- notatki i zadania.

Na ten moment aplikacja nie wymaga połączenia z bazą danych.

## Uruchamianie

```bash
npm install
npm run dev
```

Domyślnie Vite uruchamia aplikację lokalnie pod adresem:

```text
http://localhost:5173
```

Build produkcyjny:

```bash
npm run build
npm run preview
```

## Struktura projektu

```text
src/
  components/     Widgety i elementy UI
  hooks/          Hooki aplikacji, np. motyw i konfiguracja sidebaru
  pages/          Widoki aplikacji
  api/            Klient API
  services/       Dane pomocnicze/mock
```

## Najważniejsze widoki

- `/dashboard` - główny pulpit.
- `/news` - aktualności i działania zbrojne.
- `/markets` - złoto, waluty, krypto.
- `/day-plan` - fokus dnia, zadania i harmonogram.
- `/notes` - lokalne notatki i zadania.
- `/operations` - centrum operacyjne i alerty.
- `/profile` - profil użytkownika.
- `/profile/edit` - edycja profilu.
- `/settings` - motyw i konfiguracja sidebaru.
- `/repo` - informacje o repozytorium.

## Deployment na Vercel

Ustawienia projektu:

```text
Build command: npm run build
Output directory: dist
```

## Stack

- React
- TypeScript
- Vite
- Chart.js
- Recharts
- Lucide React
- Radix UI

## Status

Projekt jest w fazie aktywnej rozbudowy. Aktualna wersja skupia się na warstwie UI/UX i stabilnym trybie demo. Integracja z backendem lub bazą danych może zostać dodana później jako osobny etap.

## Licencja

MIT
