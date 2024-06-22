interface SortingProps {
  labelName: string;
  sortName: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}
const Sorting: React.FC<SortingProps> = ({
  labelName,
  sortName,
  onChange,
  options,
}) => {
  return (
    <>
      <label>
        {labelName}:
        <select value={sortName} onChange={onChange}>
          {options.map((opt) => (
            <option value={opt} key={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    </>
  );
};
export default Sorting;
