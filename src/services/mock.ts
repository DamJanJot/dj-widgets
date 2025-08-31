export type NewsItem = { title: string }
export type ForecastItem = { label: string; temp: number }
export type CurrencyBar = { name: string; value: number }
export type GoldPoint = { day: string; price: number }

export function getDashboardMock(){
  return {
    clock: new Date(),
    weather: { city: 'Warszawa', temp: 20, humidity: 75, icon: '☁️' },
    forecast: [
      { label: 'niedz.', temp: 20},
      { label: 'pon.', temp: 27},
      { label: 'wt.', temp: 30},
      { label: 'śr.', temp: 23},
      { label: 'czw.', temp: 27},
    ] as ForecastItem[],
    news: [
      { title: 'Wiele wakatów w szkołach. W taki sposób radzą sobie dyrektorzy' },
      { title: 'Rosyjska dezinformacja w akcji. Tak chce manipulować Zachodem' },
      { title: 'Rosja stawia Norwegii ultimatum w sprawie połowów' },
      { title: 'Fanatyczne i bezwzględnie oddane. Nowe pokolenie Rosjan?' },
      { title: '20 statków z pomocą dla Gazy' },
    ] as NewsItem[],
    war: [
      { title: 'Russia launches massive attack on Ukraine, as Kyiv hits oil refineries' },
    ] as NewsItem[],
    currencies: [
      { name: 'USD', value: 3.66 },
      { name: 'EUR', value: 4.27 },
      { name: 'GBP', value: 4.93 },
    ] as CurrencyBar[],
    crypto: [
      ['Bitcoin','109081.00 USD'],
      ['Ethereum','4477.31 USD'],
      ['Solana','205.28 USD'],
    ] as [string,string][],
    goldPLN: 401.63,
    goldSeries: [
      { day:'pon.', price:393.2},
      { day:'wt.', price:391.5},
      { day:'śr.', price:396.8},
      { day:'czw.', price:399.4},
      { day:'pt.', price:401.6},
    ] as GoldPoint[]
  }
}
