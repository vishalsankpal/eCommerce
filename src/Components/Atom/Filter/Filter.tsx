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
    <div>
      <h2>{FilterName}</h2>
      {cats.map(
        (cat) =>
          cat && (
            <label key={cat}>
              <input
                type="checkbox"
                value={cat}
                checked={appliedCat.includes(cat)}
                onChange={() => onChange(cat)}
              />
              {cat}
            </label>
          )
      )}
    </div>
  );
};
export default Filter;
