import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  CalendarMiniIcon,
  CheckoutArrowIcon,
  MapPinMiniIcon,
  TrashIcon,
} from "../components/icons";
import { useCart } from "../store/CartContext";
import styles from "./Cart.module.css";

function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-BY", {
    style: "currency",
    currency: "BYN",
  }).format(value);
}

const TAX_RATE = 0.08;
const PROMO_CODES = new Set(["SAVE10", "BUILD10"]);

type CartSidebarProps = {
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  checkoutDisabled?: boolean;
};

function CartSidebar({ subtotal, tax, discount, total, checkoutDisabled }: CartSidebarProps) {
  return (
    <div className={styles.sidebar}>
      <aside className={styles.summary} aria-label="Order summary">
        <h2 className={styles.summaryTitle}>О заказе</h2>
        <div className={styles.summaryRow}>
          <span>ПРомежуточный итог</span>
          <strong>{formatPrice(subtotal)}</strong>
        </div>
        <div className={styles.summaryRow}>
          <span>Налог (8%)</span>
          <strong>{formatPrice(tax)}</strong>
        </div>
        {discount > 0 ? (
          <div className={`${styles.summaryRow} ${styles.discountRow}`}>
            <span>Скидка (10%)</span>
            <strong>-{formatPrice(discount)}</strong>
          </div>
        ) : null}
        <div className={styles.totalRow}>
          <span>Итог</span>
          <strong>{formatPrice(total)}</strong>
        </div>
        <button className={styles.checkout} type="button" disabled={checkoutDisabled}>
          Перейти к оформлению заказа
          <CheckoutArrowIcon className={styles.checkoutArrowIcon} />
        </button>
        <Link className={styles.continueShopping} to="/">
          Продолжить покупки
        </Link>
      </aside>

      <aside className={styles.shippingCard} aria-label="Shipping information">
        <h2 className={styles.shippingTitle}>Информация доставки</h2>
        <div className={styles.shipBlock}>
          <span className={styles.shipIconWrap} aria-hidden="true">
            <CalendarMiniIcon className={styles.shipIcon} />
          </span>
          <div>
            <div className={styles.shipLabel}>Предпологаемая скорость доставки</div>
            <div className={styles.shipValue}>1-3 рабочих дня</div>
          </div>
        </div>
        <div className={styles.shipBlock}>
          <span className={styles.shipIconWrap} aria-hidden="true">
            <MapPinMiniIcon className={styles.shipIcon} />
          </span>
          <div>
            <div className={styles.shipLabel}>Адрес доставки</div>
            <div className={styles.shipValue}>
              Проспект Клецкова 76,<br />
              Гродно,<br />
              Республика Беларусь
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function Cart() {
  const { items, subtotal, setQuantity, removeFromCart } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState("");
  const [promoError, setPromoError] = useState("");
  const [promoSuccess, setPromoSuccess] = useState(false);

  const isEmpty = items.length === 0;
  const tax = subtotal > 0 ? subtotal * TAX_RATE : 0;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + tax - discount;

  const applyPromo = () => {
    const normalized = promoInput.trim().toUpperCase();
    if (PROMO_CODES.has(normalized)) {
      setAppliedPromo(normalized);
      setPromoError("");
      setPromoSuccess(true);
      return;
    }
    setAppliedPromo("");
    setPromoSuccess(false);
    setPromoError("Invalid promo code");
  };

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.visuallyHidden}>Shopping Cart</h1>

          {isEmpty ? (
            <div className={styles.emptyWrapper}>
              <section aria-label="Empty cart">
                <div className={styles.emptyCard}>
                  <h2 className={styles.emptyHeading}>Корзина пуста</h2>
                  <p className={styles.emptySub}>Пополняй корзину товарами</p>
                  <Link className={styles.browseProducts} to="/">
                    Ищи то, что тебе надо →
                  </Link>
                </div>
              </section>
            </div>
          ) : (
            <div className={styles.layout}>
              <h1 className={styles.cartTitle}>Shopping Cart</h1>
              <section className={styles.cartMain} aria-label="Cart items">
                <div className={styles.tableWrap}>
                  <div className={styles.tableHeader} role="row">
                    <div role="columnheader">Товар</div>
                    <div className={styles.colPrice} role="columnheader">
                      Цена
                    </div>
                    <div className={styles.colQty} role="columnheader">
                      Кол-во
                    </div>
                    <div className={styles.colTotal} role="columnheader">
                      Итого
                    </div>
                  </div>

                  {items.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <div key={item.product.id} className={styles.tableRow} role="row">
                        <div className={styles.cellProduct} role="cell">
                          <img
                            className={styles.itemImage}
                            src={item.product.imageUrl}
                            alt=""
                          />
                          <div>
                            <h2 className={styles.itemTitle}>{item.product.name}</h2>
                            <p className={styles.itemCategory}>{item.product.category}</p>
                          </div>
                        </div>
                        <div className={styles.cellPrice} role="cell">
                          {formatPrice(item.product.price)}
                        </div>
                        <div className={styles.cellQty} role="cell">
                          <div className={styles.qty}>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => setQuantity(item.product.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className={styles.qtyValue}>{item.quantity}</span>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => setQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className={styles.cellTotal} role="cell">
                          <div className={styles.totalCellInner}>
                            <span className={styles.lineTotal}>{formatPrice(lineTotal)}</span>
                            <button
                              type="button"
                              className={styles.trashBtn}
                              onClick={() => removeFromCart(item.product.id)}
                              aria-label={`Remove ${item.product.name} from cart`}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.promoSection}>
                  <p className={styles.promoQuestion}>Have a promo code?</p>
                  <div className={styles.promoRow}>
                    <input
                      className={styles.promoInput}
                      value={promoInput}
                      onChange={(event) => {
                        setPromoInput(event.target.value);
                        if (promoError) setPromoError("");
                        if (promoSuccess) setPromoSuccess(false);
                      }}
                      placeholder="Enter promo code"
                      aria-label="Enter promo code"
                    />
                    <button className={styles.promoApply} type="button" onClick={applyPromo}>
                      Ввести
                    </button>
                  </div>
                  {!promoSuccess && promoInput.trim().length > 0 ? (
                    <p className={styles.promoHint}>Попробуй: BUILD10 for 10% off</p>
                  ) : null}
                  {promoSuccess && appliedPromo ? (
                    <p className={styles.promoSuccess}>✓ Промо код активирован! Скидка 10%</p>
                  ) : null}
                  {promoError ? <p className={styles.promoError}>{promoError}</p> : null}
                </div>
              </section>

              <CartSidebar subtotal={subtotal} tax={tax} discount={discount} total={total} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
