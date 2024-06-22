import styles from "./Filter.module.scss";
interface FilterProps {
  FilterName: string;
  cats: string[];
  appliedCat: string[];
  onChange: (cat: string) => void;
}
const Filter: React.FC<FilterProps> = ({
  FilterName,
  cats,
  appliedCat,
  onChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      <h2 className={`d-flex justify-content-between ${styles.filterName}`}>
        {FilterName}
        <span className="d-flex">
          <i className="fa-solid fa-minus"></i>
        </span>
      </h2>
      <ul className={styles.filterList}>
        {cats.map(
          (cat) =>
            cat && (
              <li key={cat}>
                <label>
                  <input
                    type="checkbox"
                    value={cat}
                    checked={appliedCat.includes(cat)}
                    onChange={() => onChange(cat)}
                  />
                  {cat}
                </label>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
export default Filter;
