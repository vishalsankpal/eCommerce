import styles from "./Card.module.scss";
import badgeImg from "../../../assets/Icons/badge.png";
import newImg from "../../../assets/Icons/new.png";
import shuttleImg from "../../../assets/Icons/shuttle.png";
import { memo, useState } from "react";
interface CardProps {
  availabilityStatus: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  images: string[];
  thumbnail: string;
}
// eslint-disable-next-line react-refresh/only-export-components
const Card: React.FC<CardProps> = ({
  availabilityStatus,
  title,
  description,
  price,
  discountPercentage,
  images,
  thumbnail,
}): JSX.Element => {
  const [like, setLike] = useState(false);
  return (
    <div className={styles.cardContainer}>
      <div
        className={`d-flex justify-content-between ${styles.tagStatusContainer}`}
      >
        <div className={styles.statusContainer}>{availabilityStatus}</div>
        <div className={`d-flex align-items-center ${styles.tagContainer}`}>
          <img src={newImg} alt="New" />
          <img src={badgeImg} alt="Badge" />
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={thumbnail} alt="thumb" className={styles.first} />
        {images && <img src={images} alt="first" className={styles.second} />}
      </div>
      <div className={styles.productInfo}>
        <h3 className={`text-truncate text-center ${styles.productTitle}`}>
          {title}
        </h3>
        <p className={`text-truncate text-center ${styles.productDesc}`}>
          {description}
        </p>
        <p
          className={` d-flex align-items-center justify-content-center ${styles.productPrice}`}
        >
          {price} <span>{discountPercentage}% off</span>
        </p>
        <p className={`text-center ${styles.withoutDiscount}`}>$500</p>
        <div
          className={`d-flex align-items-center flex-column ${styles.hoverContainer}`}
        >
          <h4 className={styles.availableSizeTitle}>Available Size</h4>
          <p className={styles.availableSize}>oneSize</p>
        </div>
      </div>
      <div className={styles.emiOption}>
        <h5 className={`text-center ${styles.emiStatus}`}>EMI Available</h5>
      </div>
      <div className={styles.divider}></div>

      <div className={`d-flex justify-content-between ${styles.cardFooter}`}>
        <img src={shuttleImg} alt="shuttle" />
        <span onClick={() => setLike(!like)}>
          {!like ? (
            <i className="fa-regular fa-heart"></i>
          ) : (
            <i className={`fa-solid fa-heart ${styles.red}`}></i>
          )}
          20 likes
        </span>
      </div>
    </div>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default memo(Card);
