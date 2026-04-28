import type { Product } from "../types";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { CartIcon } from "./icons";


function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

export function ProductCard({ product }: { product: Product }) {
  

  return (
    <article className={styles.card}>
      <Link className={styles.media} to={`/product/${product.id}`} aria-label={product.name}>
        <img className={styles.img} alt="" src={product.imageUrl} />
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <div className={styles.priceRow}>
          <div className={styles.price}>{formatPrice(product.price)}</div>
        </div>

        <div className={styles.category}>{product.category}</div>

        <button className={styles.cta} type="button" >
          <CartIcon className={styles.ctaIcon} />
          Добавить в корзину
        </button>
      </div>
    </article>
  );
}

