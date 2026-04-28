import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ProductCard } from "../components/ProductCard";
import { BadgeBoxIcon, BadgeShieldIcon, BadgeTruckIcon, CartIcon } from "../components/icons";
import { products } from "../data/products";
import type { TechnicalSpec } from "../types";
import styles from "./Product.module.css";

const FALLBACK_SPECS: TechnicalSpec[] = [
  { label: "DETAILS", value: "See packaging for full specifications." },
];
const SPECS_FIRST_COLUMN = ["VOLUME", "COVERAGE", "DRY TIME"];
const SPECS_SECOND_COLUMN = ["TYPE", "FINISH", "COLORS"];
const SPEC_COLUMN_OVERRIDES: Record<string, { left: string[]; right: string[] }> = {
  "2": {
    left: ["DIMENSIONS", "GRADE", "EXPOSURE"],
    right: ["THICKNESS", "PLIES", "VENEER"],
  },
  "1": {
    left: ["WEIGHT", "COMPRESSIVE STRENGTH", "COVERAGE"],
    right: ["TYPE", "SETTING TIME", "STORAGE LIFE"],
  },
  "3": {
    left: ["DIMENSIONS", "GRADE", "TREATMENT"],
    right: ["WOOD TYPE", "MOISTURE CONTENT", "QUANTITY"],
  },
  "4": {
    left: ["DIMENSIONS", "COMPRESSIVE STRENGTH", "COLOR"],
    right: ["MATERIAL", "WATER ABSORPTION", "WEIGHT"],
  },
  "6": {
    left: ["LENGTH", "MATERIAL", "YIELD STRENGTH"],
    right: ["PROFILE", "WEIGHT", "FINISH"],
  },
};
const RELATED_OVERRIDES: Record<string, string[]> = {
  "2": ["3"], // Plywood Sheets -> Premium Lumber Planks
  "3": ["2"], // Premium Lumber Planks -> Plywood Sheets
};

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function Product() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [specsOpen, setSpecsOpen] = useState(false);


  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  useEffect(() => {
    setQuantity(1);
    setSpecsOpen(false);
  }, [id]);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (value: string) => {
    const parsed = Number(value);

    if (Number.isNaN(parsed)) {
      setQuantity(1);
      return;
    }

    setQuantity(Math.max(1, parsed));
  };

  const description = product
    ? product.description ??
      `High-quality ${product.category.toLowerCase()} for your project.`
    : "";

  const technicalSpecs = product?.technicalSpecs ?? FALLBACK_SPECS;
  const specsByLabel = new Map(technicalSpecs.map((row) => [row.label.toUpperCase(), row]));
  const getSpecsForLabels = (labels: string[]) =>
    labels.map((label) => specsByLabel.get(label)).filter((row): row is TechnicalSpec => Boolean(row));

  const overrideColumns = product ? SPEC_COLUMN_OVERRIDES[product.id] : undefined;
  const firstSpecColumn = overrideColumns
    ? getSpecsForLabels(overrideColumns.left)
    : getSpecsForLabels(SPECS_FIRST_COLUMN);
  const secondSpecColumn = overrideColumns
    ? getSpecsForLabels(overrideColumns.right)
    : getSpecsForLabels(SPECS_SECOND_COLUMN);
  const knownLabels = new Set([...(overrideColumns?.left ?? SPECS_FIRST_COLUMN), ...(overrideColumns?.right ?? SPECS_SECOND_COLUMN)]);
  const remainingSpecs = technicalSpecs.filter((row) => !knownLabels.has(row.label.toUpperCase()));
  const hasKnownColumns = firstSpecColumn.length > 0 || secondSpecColumn.length > 0;
  const leftSpecs = hasKnownColumns ? [...firstSpecColumn, ...remainingSpecs] : remainingSpecs;
  const rightSpecs = hasKnownColumns ? secondSpecColumn : [];
  const getSpecRowClassName = (label: string) =>
    `${styles.specRow} ${label.toUpperCase() === "COLORS" ? styles.specRowNoUnderline : ""}`;
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const overrideIds = RELATED_OVERRIDES[product.id];
    if (overrideIds && overrideIds.length > 0) {
      return overrideIds
        .map((relatedId) => products.find((p) => p.id === relatedId))
        .filter((p): p is NonNullable<typeof p> => Boolean(p));
    }

    return products
      .filter((p) => p.id !== product.id && p.category === product.category)
      .slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p className={styles.breadcrumbs}>
              <Link to="/">Каталог</Link> <span aria-hidden="true">/</span>{" "}
              Товар не найден
            </p>
            <h1 className={styles.h1}>Товар не найден</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <p className={styles.breadcrumbs}>
            <Link to="/">Каталог</Link> <span aria-hidden="true">/</span>{" "}
            {product.name}
          </p>

          <div className={styles.layout}>
            <div className={styles.media}>
              
            </div>

            <div className={styles.panel}>
              <h1 className={styles.h1}>{product.name}</h1>
              
              <div className={styles.priceRow}>
                <div className={styles.price}>{formatPrice(product.price)}</div>
                <div className={styles.unit}>/unit</div>
              </div>

              <div className={styles.badges}>
                <div className={styles.badge}>
                  <div className={styles.badgeTitle}>
                    <span className={styles.badgeIcon} aria-hidden="true">
                      <BadgeBoxIcon />
                    </span>
                    Товар премиум класса
                  </div>
                  <div className={styles.badgeText}>Качество гарантировано</div>
                </div>
                <div className={styles.badge}>
                  <div className={styles.badgeTitle}>
                    <span className={styles.badgeIcon} aria-hidden="true">
                      <BadgeTruckIcon />
                    </span>
                    Скорость доставки
                  </div>
                  <div className={styles.badgeText}>1-3 Рабочих дней</div>
                </div>
                <div className={styles.badge}>
                  <div className={styles.badgeTitle}>
                    <span className={styles.badgeIcon} aria-hidden="true">
                      <BadgeShieldIcon />
                    </span>
                    Гарантия
                  </div>
                  <div className={styles.badgeText}>30-дней</div>
                </div>
              </div>

              <div className={styles.qtyRow}>
                <div className={styles.qtyLabel}>Quantity</div>
                <div className={styles.qty}>
                  <button className={styles.qtyBtn} onClick={decreaseQty} type="button">
                    -
                  </button>
                  <input
                    className={styles.qtyInput}
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(event) => handleQuantityChange(event.target.value)}
                    aria-label="Quantity"
                  />
                  <button className={styles.qtyBtn} onClick={increaseQty} type="button">
                    +
                  </button>
                </div>
              </div>

              <div className={styles.actions}>
                
                 
                <button className={styles.secondary} type="button">
                  Купить
                </button>
              </div>

              <section className={styles.about}>
                <h2 className={styles.h2}>Description</h2>
                <p className={styles.p}>{description}</p>

                <div className={styles.specCard}>
                  <button
                    className={styles.specToggle}
                    type="button"
                    aria-expanded={specsOpen}
                    onClick={() => setSpecsOpen((open) => !open)}
                  >
                    <span>Характеристики</span>
                    <span
                      className={specsOpen ? styles.specChevronOpen : styles.specChevron}
                      aria-hidden="true"
                    >
                      ▾
                    </span>
                  </button>
                  {specsOpen ? (
                    <div className={styles.specBody}>
                      <div className={styles.specColumns}>
                        <div className={styles.specList}>
                          {leftSpecs.map((row) => (
                            <div key={row.label} className={getSpecRowClassName(row.label)}>
                              <div className={styles.specLabel}>{row.label}</div>
                              <div className={styles.specValue}>{row.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className={styles.specList}>
                          {rightSpecs.map((row) => (
                            <div key={row.label} className={getSpecRowClassName(row.label)}>
                              <div className={styles.specLabel}>{row.label}</div>
                              <div className={styles.specValue}>{row.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>
            </div>
          </div>

          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Похожие товары</h2>
            {relatedProducts.length > 0 ? (
              <div className={styles.relatedList}>
                {relatedProducts.map((related) => (
                  <ProductCard key={related.id} product={related} />
                ))}
              </div>
            ) : null}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

