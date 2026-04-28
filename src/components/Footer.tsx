import { FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon } from "./icons";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandCol}>
            <h3 className={styles.footerTitle}>BuildMart</h3>
            <p className={styles.footerText}>
              Your trusted source for premium building materials and construction
              supplies since 1995.
            </p>
            <div className={styles.socials} aria-label="Social links">
              <a className={styles.socialLink} href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a className={styles.socialLink} href="#" aria-label="Twitter">
                <TwitterIcon />
              </a>
              <a className={styles.socialLink} href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a className={styles.socialLink} href="#" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div>
            <h3 className={styles.footerTitle}>Ссылки</h3>
            <ul className={styles.list}>
              <li>
                <a href="#">О нас</a>
              </li>
              <li>
                <a href="#">Каталог</a>
              </li>
              <li>
                <a href="#">Информация о доставке</a>
              </li>
              <li>
                <a href="#">Политика возвратов</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.footerTitle}>Для клиентов</h3>
            <ul className={styles.list}>
              <li>
                <a href="#">Контактные данные</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">Доставка и отслеживание</a>
              </li>
              <li>
                <a href="#">Политика приватности</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={styles.footerTitle}>Рассылка</h3>
            <p className={styles.footerText}>
              Подпишитесь для получения особых акций.
            </p>
            <div className={styles.newsletterRow}>
              <input
                className={styles.email}
                placeholder="Ваша почта"
                aria-label="Ваша почта..."
              />
              <button className={styles.subscribe} type="button" aria-label="Subscribe">
                ✉
              </button>
            </div>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.contactRow}>
          <div>
            <div className={styles.contactLabel}>Телефон</div>
            <div className={styles.contactValue}>1-800-BUILD-MART</div>
          </div>
          <div>
            <div className={styles.contactLabel}>Почта</div>
            <div className={styles.contactValue}>support@buildmart.com</div>
          </div>
          <div>
            <div className={styles.contactLabel}>Адрес</div>
            <div className={styles.contactValue}>123 Construction Ave, Builder City, BC 12345</div>
          </div>
        </div>

        <div className={styles.separator} />

        <div className={styles.copyright}>
          © 2026 BuildMart. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

