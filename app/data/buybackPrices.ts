// ──────────────────────────────────────────────────────────────
// Výkupní ceník iPhonů  –  snadno editovatelný
// Ceny jsou v CZK.
//
// Stav (condition) má 5 úrovní:
//   novy       = Nerozbalené, originální zařízení
//   perfektni  = Rozbalené bez známek použití
//   velmiDobry = Na první pohled jako nové, minimální známky
//   dobry      = Lehké známky použití, mikrovlásečnice, oděrky
//   uchazejici = Výrazné známky použití, škrábance, oděrky
//
// Defekty (srážky z ceny):
//   batteryBelow85  – baterie pod 85 %
//   brokenDisplay   – rozbitý displej
//   brokenCamera    – poškozená / nefunkční kamera
//   bentOrBroken    – ohnutý, prasklý či nefunkční
// ──────────────────────────────────────────────────────────────

export type Condition = 'novy' | 'perfektni' | 'velmiDobry' | 'dobry' | 'uchazejici';

export const conditionOptions: {
  key: Condition;
  label: string;
  description: string;
}[] = [
  { key: 'novy',       label: 'Nový',        description: 'Nerozbalené, originální zařízení.' },
  { key: 'perfektni',  label: 'Perfektní',   description: 'Rozbalené zařízení bez známek použití.' },
  { key: 'velmiDobry', label: 'Velmi dobrý', description: 'Zařízení na první pohled jako nové, minimální známky použití.' },
  { key: 'dobry',      label: 'Dobrý',       description: 'Zařízení má lehké známky použití. Mikrovlásečnice na displeji nebo malé oděrky na těle.' },
  { key: 'uchazejici', label: 'Ucházející',  description: 'Zařízení má výrazné známky použití. Škrábance nebo oděrky.' },
];

/**
 * Globální korekční koeficient výkupních cen.
 * 0.70 = ceny jsou sníženy o 30 % oproti ceníkovým hodnotám níže.
 * Změn zde stačí k úpravě všech cen najednou.
 */
export const PRICE_MULTIPLIER = 0.70;

/** Procentuální srážky za defekty (z bazové ceny) – snadno upravitelné */
export const defectPenalties = {
  batteryBelow85: 0.15,  // −15 %
  brokenDisplay:  0.25,  // −25 %
  brokenCamera:   0.15,  // −15 %
  bentOrBroken:   0.30,  // −30 %
};

export interface BuybackModel {
  name: string;
  storages: {
    label: string;
    prices: Record<Condition, number>;
  }[];
}

const buybackPrices: BuybackModel[] = [
  // ── iPhone 17 řada (orientační ceny – doporučujeme ověřit před nasazením) ──
  {
    name: 'iPhone 17 Pro Max',
    storages: [
      { label: '256 GB', prices: { novy: 38000, perfektni: 33000, velmiDobry: 31000, dobry: 28000, uchazejici: 23000 } },
      { label: '512 GB', prices: { novy: 42000, perfektni: 37000, velmiDobry: 34000, dobry: 31000, uchazejici: 26000 } },
      { label: '1 TB',   prices: { novy: 46000, perfektni: 40000, velmiDobry: 37000, dobry: 34000, uchazejici: 28000 } },
      { label: '2 TB',   prices: { novy: 52000, perfektni: 45000, velmiDobry: 42000, dobry: 38000, uchazejici: 32000 } },
    ],
  },
  {
    name: 'iPhone 17 Pro',
    storages: [
      { label: '256 GB', prices: { novy: 33000, perfektni: 28000, velmiDobry: 26000, dobry: 24000, uchazejici: 19000 } },
      { label: '512 GB', prices: { novy: 37000, perfektni: 32000, velmiDobry: 29000, dobry: 27000, uchazejici: 22000 } },
      { label: '1 TB',   prices: { novy: 41000, perfektni: 35000, velmiDobry: 32000, dobry: 30000, uchazejici: 25000 } },
      { label: '2 TB',   prices: { novy: 46000, perfektni: 39000, velmiDobry: 36000, dobry: 33000, uchazejici: 28000 } },
    ],
  },
  {
    name: 'iPhone Air',
    storages: [
      { label: '256 GB', prices: { novy: 28000, perfektni: 24000, velmiDobry: 22000, dobry: 20000, uchazejici: 16000 } },
      { label: '512 GB', prices: { novy: 32000, perfektni: 27000, velmiDobry: 25000, dobry: 23000, uchazejici: 18000 } },
      { label: '1 TB',   prices: { novy: 36000, perfektni: 30000, velmiDobry: 28000, dobry: 26000, uchazejici: 21000 } },
    ],
  },
  {
    name: 'iPhone 17',
    storages: [
      { label: '256 GB', prices: { novy: 23000, perfektni: 19000, velmiDobry: 18000, dobry: 16500, uchazejici: 13500 } },
      { label: '512 GB', prices: { novy: 26000, perfektni: 22000, velmiDobry: 20500, dobry: 19000, uchazejici: 15500 } },
    ],
  },

  // ── iPhone 16 řada ──
  {
    name: 'iPhone 16 Pro Max',
    storages: [
      { label: '256 GB', prices: { novy: 32000, perfektni: 28000, velmiDobry: 26000, dobry: 24000, uchazejici: 20000 } },
      { label: '512 GB', prices: { novy: 36000, perfektni: 31000, velmiDobry: 29000, dobry: 27000, uchazejici: 22000 } },
      { label: '1 TB',   prices: { novy: 40000, perfektni: 35000, velmiDobry: 32000, dobry: 30000, uchazejici: 25000 } },
    ],
  },
  {
    name: 'iPhone 16 Pro',
    storages: [
      { label: '128 GB', prices: { novy: 26000, perfektni: 22000, velmiDobry: 20000, dobry: 19000, uchazejici: 15000 } },
      { label: '256 GB', prices: { novy: 29000, perfektni: 25000, velmiDobry: 23000, dobry: 21000, uchazejici: 17000 } },
      { label: '512 GB', prices: { novy: 33000, perfektni: 28000, velmiDobry: 26000, dobry: 24000, uchazejici: 19000 } },
      { label: '1 TB',   prices: { novy: 37000, perfektni: 31000, velmiDobry: 29000, dobry: 27000, uchazejici: 22000 } },
    ],
  },
  {
    name: 'iPhone 16',
    storages: [
      { label: '128 GB', prices: { novy: 19000, perfektni: 16000, velmiDobry: 15000, dobry: 13500, uchazejici: 11000 } },
      { label: '256 GB', prices: { novy: 22000, perfektni: 18000, velmiDobry: 17000, dobry: 15500, uchazejici: 12500 } },
      { label: '512 GB', prices: { novy: 25000, perfektni: 21000, velmiDobry: 19500, dobry: 18000, uchazejici: 14500 } },
    ],
  },

  // ── iPhone 15 řada ──
  {
    name: 'iPhone 15 Pro Max',
    storages: [
      { label: '256 GB', prices: { novy: 26000, perfektni: 22000, velmiDobry: 20500, dobry: 19000, uchazejici: 15000 } },
      { label: '512 GB', prices: { novy: 29000, perfektni: 25000, velmiDobry: 23000, dobry: 21500, uchazejici: 17000 } },
      { label: '1 TB',   prices: { novy: 33000, perfektni: 28000, velmiDobry: 26000, dobry: 24000, uchazejici: 19000 } },
    ],
  },
  {
    name: 'iPhone 15 Pro',
    storages: [
      { label: '128 GB', prices: { novy: 20000, perfektni: 17000, velmiDobry: 15500, dobry: 14500, uchazejici: 11500 } },
      { label: '256 GB', prices: { novy: 23000, perfektni: 19500, velmiDobry: 18000, dobry: 16500, uchazejici: 13000 } },
      { label: '512 GB', prices: { novy: 26000, perfektni: 22000, velmiDobry: 20500, dobry: 19000, uchazejici: 15000 } },
      { label: '1 TB',   prices: { novy: 29000, perfektni: 25000, velmiDobry: 23000, dobry: 21500, uchazejici: 17000 } },
    ],
  },
  {
    name: 'iPhone 15',
    storages: [
      { label: '128 GB', prices: { novy: 14500, perfektni: 12000, velmiDobry: 11000, dobry: 10000, uchazejici: 8000 } },
      { label: '256 GB', prices: { novy: 17000, perfektni: 14000, velmiDobry: 13000, dobry: 12000, uchazejici: 9500 } },
      { label: '512 GB', prices: { novy: 19500, perfektni: 16500, velmiDobry: 15000, dobry: 14000, uchazejici: 11000 } },
    ],
  },

  // ── iPhone 14 řada ──
  {
    name: 'iPhone 14 Pro Max',
    storages: [
      { label: '128 GB', prices: { novy: 17000, perfektni: 14000, velmiDobry: 13000, dobry: 12000, uchazejici: 9500 } },
      { label: '256 GB', prices: { novy: 19000, perfektni: 16000, velmiDobry: 14500, dobry: 13500, uchazejici: 10500 } },
      { label: '512 GB', prices: { novy: 22000, perfektni: 18500, velmiDobry: 17000, dobry: 16000, uchazejici: 12500 } },
      { label: '1 TB',   prices: { novy: 25000, perfektni: 21000, velmiDobry: 19500, dobry: 18000, uchazejici: 14000 } },
    ],
  },
  {
    name: 'iPhone 14 Pro',
    storages: [
      { label: '128 GB', prices: { novy: 14500, perfektni: 12000, velmiDobry: 11000, dobry: 10000, uchazejici: 8000 } },
      { label: '256 GB', prices: { novy: 17000, perfektni: 14000, velmiDobry: 13000, dobry: 12000, uchazejici: 9500 } },
      { label: '512 GB', prices: { novy: 19000, perfektni: 16000, velmiDobry: 14500, dobry: 13500, uchazejici: 10500 } },
      { label: '1 TB',   prices: { novy: 22000, perfektni: 18500, velmiDobry: 17000, dobry: 16000, uchazejici: 12500 } },
    ],
  },
  {
    name: 'iPhone 14',
    storages: [
      { label: '128 GB', prices: { novy: 10000, perfektni: 8000, velmiDobry: 7500, dobry: 6500, uchazejici: 5000 } },
      { label: '256 GB', prices: { novy: 12000, perfektni: 9500, velmiDobry: 9000, dobry: 8000, uchazejici: 6000 } },
      { label: '512 GB', prices: { novy: 14000, perfektni: 11000, velmiDobry: 10500, dobry: 9500, uchazejici: 7500 } },
    ],
  },

  // ── iPhone 13 řada ──
  {
    name: 'iPhone 13 Pro Max',
    storages: [
      { label: '128 GB', prices: { novy: 13500, perfektni: 11000, velmiDobry: 10000, dobry: 9000, uchazejici: 7000 } },
      { label: '256 GB', prices: { novy: 15500, perfektni: 12500, velmiDobry: 11500, dobry: 10500, uchazejici: 8000 } },
      { label: '512 GB', prices: { novy: 17500, perfektni: 14500, velmiDobry: 13500, dobry: 12500, uchazejici: 9500 } },
      { label: '1 TB',   prices: { novy: 20000, perfektni: 16500, velmiDobry: 15500, dobry: 14000, uchazejici: 11000 } },
    ],
  },
  {
    name: 'iPhone 13 Pro',
    storages: [
      { label: '128 GB', prices: { novy: 11000, perfektni: 9000, velmiDobry: 8000, dobry: 7500, uchazejici: 5500 } },
      { label: '256 GB', prices: { novy: 13000, perfektni: 10500, velmiDobry: 9500, dobry: 9000, uchazejici: 6500 } },
      { label: '512 GB', prices: { novy: 15000, perfektni: 12000, velmiDobry: 11000, dobry: 10000, uchazejici: 8000 } },
      { label: '1 TB',   prices: { novy: 17000, perfektni: 14000, velmiDobry: 13000, dobry: 12000, uchazejici: 9500 } },
    ],
  },
  {
    name: 'iPhone 13',
    storages: [
      { label: '128 GB', prices: { novy: 8000, perfektni: 6500, velmiDobry: 6000, dobry: 5000, uchazejici: 3500 } },
      { label: '256 GB', prices: { novy: 10000, perfektni: 8000, velmiDobry: 7500, dobry: 6500, uchazejici: 5000 } },
      { label: '512 GB', prices: { novy: 12000, perfektni: 9500, velmiDobry: 9000, dobry: 8000, uchazejici: 6000 } },
    ],
  },
  {
    name: 'iPhone 13 mini',
    storages: [
      { label: '128 GB', prices: { novy: 7000, perfektni: 5500, velmiDobry: 5000, dobry: 4500, uchazejici: 3000 } },
      { label: '256 GB', prices: { novy: 8500, perfektni: 7000, velmiDobry: 6500, dobry: 5500, uchazejici: 4000 } },
      { label: '512 GB', prices: { novy: 10500, perfektni: 8500, velmiDobry: 8000, dobry: 7000, uchazejici: 5500 } },
    ],
  },

  // ── iPhone 12 řada ──
  {
    name: 'iPhone 12 Pro Max',
    storages: [
      { label: '128 GB', prices: { novy: 10000, perfektni: 8000, velmiDobry: 7500, dobry: 6500, uchazejici: 5000 } },
      { label: '256 GB', prices: { novy: 12000, perfektni: 9500, velmiDobry: 9000, dobry: 8000, uchazejici: 6000 } },
      { label: '512 GB', prices: { novy: 14000, perfektni: 11000, velmiDobry: 10500, dobry: 9500, uchazejici: 7500 } },
    ],
  },
  {
    name: 'iPhone 12 Pro',
    storages: [
      { label: '128 GB', prices: { novy: 8000, perfektni: 6500, velmiDobry: 6000, dobry: 5500, uchazejici: 3500 } },
      { label: '256 GB', prices: { novy: 10000, perfektni: 8000, velmiDobry: 7500, dobry: 6500, uchazejici: 5000 } },
      { label: '512 GB', prices: { novy: 12000, perfektni: 9500, velmiDobry: 9000, dobry: 8000, uchazejici: 6000 } },
    ],
  },
  {
    name: 'iPhone 12',
    storages: [
      { label: '64 GB',  prices: { novy: 5500, perfektni: 4500, velmiDobry: 4000, dobry: 3500, uchazejici: 2500 } },
      { label: '128 GB', prices: { novy: 7000, perfektni: 5500, velmiDobry: 5000, dobry: 4500, uchazejici: 3000 } },
      { label: '256 GB', prices: { novy: 8500, perfektni: 7000, velmiDobry: 6500, dobry: 5500, uchazejici: 4000 } },
    ],
  },
  {
    name: 'iPhone 12 mini',
    storages: [
      { label: '64 GB',  prices: { novy: 4500, perfektni: 3500, velmiDobry: 3000, dobry: 2500, uchazejici: 1500 } },
      { label: '128 GB', prices: { novy: 5500, perfektni: 4500, velmiDobry: 4000, dobry: 3500, uchazejici: 2500 } },
      { label: '256 GB', prices: { novy: 7000, perfektni: 5500, velmiDobry: 5000, dobry: 4500, uchazejici: 3000 } },
    ],
  },

  // ── iPhone 11 řada ──
  {
    name: 'iPhone 11 Pro Max',
    storages: [
      { label: '64 GB',  prices: { novy: 7000, perfektni: 5500, velmiDobry: 5000, dobry: 4500, uchazejici: 3000 } },
      { label: '256 GB', prices: { novy: 8500, perfektni: 7000, velmiDobry: 6500, dobry: 5500, uchazejici: 4000 } },
      { label: '512 GB', prices: { novy: 10500, perfektni: 8500, velmiDobry: 8000, dobry: 7000, uchazejici: 5500 } },
    ],
  },
  {
    name: 'iPhone 11 Pro',
    storages: [
      { label: '64 GB',  prices: { novy: 5500, perfektni: 4500, velmiDobry: 4000, dobry: 3500, uchazejici: 2500 } },
      { label: '256 GB', prices: { novy: 7500, perfektni: 6000, velmiDobry: 5500, dobry: 4500, uchazejici: 3500 } },
      { label: '512 GB', prices: { novy: 9500, perfektni: 7500, velmiDobry: 7000, dobry: 6000, uchazejici: 4500 } },
    ],
  },
  {
    name: 'iPhone 11',
    storages: [
      { label: '64 GB',  prices: { novy: 4000, perfektni: 3000, velmiDobry: 2500, dobry: 2500, uchazejici: 1500 } },
      { label: '128 GB', prices: { novy: 5000, perfektni: 4000, velmiDobry: 3500, dobry: 3000, uchazejici: 2500 } },
      { label: '256 GB', prices: { novy: 6500, perfektni: 5000, velmiDobry: 4500, dobry: 4000, uchazejici: 3000 } },
    ],
  },
];

export default buybackPrices;
