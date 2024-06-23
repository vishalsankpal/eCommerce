import { useState } from "react";
import styles from "./Header.module.scss";
const Header: React.FC = (): JSX.Element => {
  const [navigationToggle, setNavigationToggle] = useState(false);
  return (
    <header className="d-flex flex-column">
      <div className={`d-flex justify-content-between ${styles.ctaContainer}`}>
        <div>
          <h1>
            New <span className={styles.seprator}></span>{" "}
            <span className={`${styles.categoryName}`}>Pre-Owned</span>
          </h1>
        </div>

        <div className={`d-flex align-items-center ${styles.ctaBtnContainer}`}>
          <button>Sell with us</button>
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10597/10597864.png"
              alt="Indian flag"
            />
          </button>
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/128/747/747376.png"
              alt="user icon"
            />
          </button>
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt="faviourte"
            />
          </button>
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png"
              alt="cart"
            />
          </button>
        </div>
      </div>
      <div
        className={`d-flex justify-content-between align-items-center ${styles.navigationSearchContainer}`}
      >
        <button
          className={styles.hamburger}
          onClick={() => setNavigationToggle(!navigationToggle)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/9091/9091429.png"
            alt="hamburger"
          />
        </button>
        <div className={navigationToggle ? styles.show : ""}>
          <nav>
            <ul>
              <li>
                <a href="">Just In</a>
              </li>
              <li>
                <a href="">Brands</a>
              </li>
              <li>
                <a href="">Woman</a>
              </li>
              <li>
                <a href="">Mens</a>
              </li>
              <li>
                <a href="">Kids</a>
              </li>
              <li>
                <a href="" className={styles.active}>
                  Watches
                </a>
              </li>
              <li>
                <a href="">Jewellery</a>
              </li>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Indie Luxe</a>
              </li>
              <li>
                <a href="">Le Prestige</a>
              </li>
              <li>
                <a href="">SALE</a>
              </li>
              <li>
                <a href="">Auctions</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.searchContainer}>
          <input
            type="text"
            name="search"
            placeholder="What Are You Looking For"
          />
          <button>
            <img
              src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
              alt="search"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
export default Header;
