import styles from "./Adcard.module.scss";
interface AdBannerProps {
  type: string;
}
const AdCard: React.FC<AdBannerProps> = ({ type }) => {
  return <div className={styles.Adcard}>Adcard{type}</div>;
};
export default AdCard;
