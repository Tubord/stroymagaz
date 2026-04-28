import { useMemo, useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import styles from "./Home.module.css";

type SortValue = "name-asc" | "price-asc" | "price-desc";
const PRICE_MIN = 0;
const PRICE_MAX = 400;
const RATING_FILTERS = [5, 4, 3] as const;

export function Home() {
  const [sortBy, setSortBy] = useState<SortValue>("name-asc");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(PRICE_MIN);
  const [maxPrice, setMaxPrice] = useState<number>(PRICE_MAX);


  const clearFilters = () => {
    setSelectedRatings([]);
    setMinPrice(PRICE_MIN);
    setMaxPrice(PRICE_MAX);
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.hero}>
            <h1 className={styles.h1}>Building Materials</h1>
            <p className={styles.subtitle}>
              Только премиальные материалы
            </p>
          </section>

          <section className={styles.controls} aria-label="Product controls">
            <button
              className={styles.filters}
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              aria-expanded={filtersOpen}
              aria-controls="filters-panel"
            >

            </button>

            

            <div className={styles.sort}>
              <span className={styles.sortLabel}>Сортировать по:</span>
              <select
                className={styles.select}
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortValue)}
              >
                <option value="name-asc">Имени (A-Я)</option>
                <option value="price-asc">Цене (ниж. выш.)</option>
                <option value="price-desc">Цене (выш. ниж.)</option>
              </select>
            </div>
          </section>

          {filtersOpen ? (
            <section id="filters-panel" className={styles.filtersPanel} aria-label="Filters">
              <div className={styles.filtersGrid}>
                <div className={styles.filterGroup}>
                  <div className={styles.filterLabel}>Минимальный рейтинг</div>
                  <div className={styles.ratingChecks}>
                    {RATING_FILTERS.map((rating) => {
                      const checked = selectedRatings.includes(rating);
                      return (
                        <label key={rating} className={styles.ratingItem}>
                          <input
                            type="checkbox"
                            checked={checked}
                            
                          />
                          <span>{rating}+ звезд</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className={styles.filterGroup}>
                  <div className={styles.filterLabel}>Цена</div>
                  <div className={styles.rangeWrap}>
                    <div className={styles.rangeTrack} />
                    <input
                      className={styles.rangeInput}
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1}
                      value={minPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setMinPrice(Math.min(value, maxPrice));
                      }}
                      aria-label="Minimum price range"
                    />
                    <input
                      className={styles.rangeInput}
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1}
                      value={maxPrice}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setMaxPrice(Math.max(value, minPrice));
                      }}
                      aria-label="Maximum price range"
                    />
                  </div>
                  <div className={styles.rangeLabels}>
                    <span>${PRICE_MIN}</span>
                    <span>${PRICE_MAX}</span>
                  </div>
                </div>

                <div className={styles.filterActions}>
                  <button className={styles.clearAllFilters} type="button" onClick={clearFilters}>
                    Очистить
                  </button>
                </div>
              </div>
            </section>
          ) : null}

          
          
        </div>
      </main>

      <Footer />
    </div>
  );
}

