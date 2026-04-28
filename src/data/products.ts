import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "5",
    name: "Набор фасадной краски",
    price: 45.5,
    rating: 3.5,
    category: "Краски и покрытия",
    imageUrl: "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?...",
    images: [
      "https://images.unsplash.com/photo-1673297821205-e0575bbc2ab7?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Профессиональная фасадная краска, устойчивая к погодным условиям. Отличное покрытие и долговечность.",
    technicalSpecs: [
      { label: "ОБЪЁМ", value: "5 литров" },
      { label: "ТИП", value: "Акриловая" },
      { label: "РАСХОД", value: "10 м²/л" },
      { label: "ФИНИШ", value: "Матовый" },
      { label: "ВРЕМЯ СУШКИ", value: "2-4 часа" },
      { label: "ЦВЕТА", value: "Разные" },
    ],
  },

  {
    id: "2",
    name: "Фанера строительная",
    price: 60,
    rating: 4.5,
    category: "Древесина",
    imageUrl: "https://images.unsplash.com/photo-1704167674713-649193461719?...",
    images: [
      "https://images.unsplash.com/photo-1704167674713-649193461719?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Прочная строительная фанера для полов, стен и крыш.",
    technicalSpecs: [
      { label: "РАЗМЕР", value: "1220x2440 мм" },
      { label: "ТОЛЩИНА", value: "18 мм" },
      { label: "СОРТ", value: "CDX" },
      { label: "СЛОИ", value: "7 слоёв" },
      { label: "ТИП", value: "Влагостойкая" },
      { label: "МАТЕРИАЛ", value: "Хвойная древесина" },
    ],
  },

  {
    id: "1",
    name: "Цемент М500",
    price: 18.5,
    rating: 5.0,
    category: "Цемент и бетон",
    imageUrl: "https://images.unsplash.com/photo-1718117075248-3d3c3cd65264?...",
    images: [
      "https://images.unsplash.com/photo-1718117075248-3d3c3cd65264?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Высококачественный цемент для строительства и ремонта.",
    technicalSpecs: [
      { label: "ВЕС", value: "25 кг" },
      { label: "ТИП", value: "М500" },
      { label: "ПРОЧНОСТЬ", value: "500 кг/см²" },
      { label: "СХВАТЫВАНИЕ", value: "2-4 часа" },
      { label: "РАСХОД", value: "0.45 м³" },
      { label: "ХРАНЕНИЕ", value: "6 месяцев" },
    ],
  },

  {
    id: "3",
    name: "Доска обрезная",
    price: 70,
    rating: 4.5,
    category: "Древесина",
    imageUrl: "https://images.unsplash.com/photo-1764025390519-1ccc15d719a8?...",
    images: [
      "https://images.unsplash.com/photo-1764025390519-1ccc15d719a8?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Качественная доска для строительства и отделки.",
    technicalSpecs: [
      { label: "РАЗМЕР", value: "50x150x6000 мм" },
      { label: "ПОРОДА", value: "Сосна" },
      { label: "СОРТ", value: "1 сорт" },
      { label: "ВЛАЖНОСТЬ", value: "15%" },
      { label: "ОБРАБОТКА", value: "Строганная" },
      { label: "ПРОДАЖА", value: "Поштучно" },
    ],
  },

  {
    id: "4",
    name: "Кирпич красный",
    price: 1.2,
    rating: 4.0,
    category: "Кирпичи",
    imageUrl: "https://images.unsplash.com/photo-1761358270922-5a4df4ab9782?...",
    images: [
      "https://images.unsplash.com/photo-1761358270922-5a4df4ab9782?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Классический красный кирпич для строительства.",
    technicalSpecs: [
      { label: "РАЗМЕР", value: "250x120x65 мм" },
      { label: "МАТЕРИАЛ", value: "Глина" },
      { label: "ПРОЧНОСТЬ", value: "3000 PSI" },
      { label: "ВОДОПОГЛОЩЕНИЕ", value: "<8%" },
      { label: "ЦВЕТ", value: "Красный" },
      { label: "ВЕС", value: "3.5 кг" },
    ],
  },

  {
    id: "6",
    name: "Стальные балки",
    price: 150,
    rating: 5.0,
    category: "Металл",
    imageUrl: "https://images.unsplash.com/photo-1707236527163-bd3478178466?...",
    images: [
      "https://images.unsplash.com/photo-1707236527163-bd3478178466?...",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?...",
      "https://images.unsplash.com/photo-1581091012184-7c63d5d6c1f9?...",
    ],
    description:
      "Прочные стальные балки для строительства.",
    technicalSpecs: [
      { label: "ДЛИНА", value: "6 м" },
      { label: "ПРОФИЛЬ", value: "I-балка" },
      { label: "МАТЕРИАЛ", value: "Сталь" },
      { label: "ВЕС", value: "450 кг" },
      { label: "ПРОЧНОСТЬ", value: "50 ksi" },
      { label: "ПОКРЫТИЕ", value: "Без покрытия" },
    ],
  },
];
