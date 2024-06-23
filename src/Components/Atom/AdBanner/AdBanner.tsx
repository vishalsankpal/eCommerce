import AdBannerImg from "../../../assets/PLP-Banner.png";
import styles from "./AdBanner.module.scss";
const AdBanner = () => {
  return (
    <>
      <img src={AdBannerImg} alt="Ad Banner" className={styles.banner} />
    </>
  );
};
export default AdBanner;
