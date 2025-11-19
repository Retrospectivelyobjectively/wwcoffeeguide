// src/data/coffeeShops.ts
export type BrewMethod = "v60" | "chemex" | "kalita" | "aeropress" | "batch";

export type CoffeeShop = {
  slug: string;                // для URL: /coffee-shops/{slug}
  name: string;
  city: string;
  district?: string;
  roasters: string[];          // местные обжарщики
  originCountry: string;       // страна происхождения основного зерна
  process: string;             // способ обработки
  brewMethods: BrewMethod[];   // альтернативные методы
  hasEspresso: boolean;
  hasWifi: boolean;
  hasOutlets: boolean;
  goodForWork: boolean;
  verified: boolean;
};

export const coffeeShops: CoffeeShop[] = [
  {
    slug: "filter-and-friends",
    name: "Filter & Friends",
    city: "Москва",
    district: "Центр",
    roasters: ["Local Roasters", "North Side"],
    originCountry: "Эфиопия / Колумбия",
    process: "washed / natural",
    brewMethods: ["v60", "chemex", "batch"],
    hasEspresso: true,
    hasWifi: true,
    hasOutlets: true,
    goodForWork: true,
    verified: true,
  },
  {
    slug: "third-wave-corner",
    name: "Third Wave Corner",
    city: "Санкт-Петербург",
    district: "Петроградская сторона",
    roasters: ["Bright Beans"],
    originCountry: "Гватемала",
    process: "washed",
    brewMethods: ["v60", "kalita", "aeropress"],
    hasEspresso: true,
    hasWifi: true,
    hasOutlets: false,
    goodForWork: false,
    verified: false,
  },
  {
    slug: "origin-lab",
    name: "Origin Lab",
    city: "Москва",
    district: "Хамовники",
    roasters: ["City Roast"],
    originCountry: "Кения",
    process: "washed",
    brewMethods: ["batch", "v60"],
    hasEspresso: true,
    hasWifi: false,
    hasOutlets: true,
    goodForWork: false,
    verified: true,
  },
];
