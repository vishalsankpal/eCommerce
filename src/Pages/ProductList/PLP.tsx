import { ChangeEvent, useEffect, useState } from "react";
import { getProducts, setSortCriteria } from "./ProductSlice";
import { useAppSelector, useAppDispatch } from "../../Hooks/ReduxHooks";
import selectFilteredProducts from "./Selector";
import Sorting from "../../Components/Atom/Sorting/Sorting";
import Loader from "../../Components/Templates/Loader/Loader";
import styles from "./PLP.module.scss";
import Sidebar from "../../Components/Organisms/Sidebar/Sidebar";
import AdBanner from "../../Components/Atom/AdBanner/AdBanner";
import Card from "../../Components/Organisms/Card/Card";
import AdCard from "../../Components/Organisms/AdCard/AdCard";

const PLP: React.FC = (): JSX.Element => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSortCriteria({ sortBy, sortOrder }));
  }, [sortBy, sortOrder, dispatch]);

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value);
  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={`grid ${styles.plpWrapper}`}>
      <Sidebar />
      <main className={styles.mainContainer}>
        <AdBanner />
        <div
          className={`d-flex justify-content-end ${styles.sortingContainer}`}
        >
          <Sorting
            labelName={"Sort by"}
            sortName={sortBy}
            onChange={handleSortByChange}
            options={["price", "title"]}
          />
          <Sorting
            labelName={"Order"}
            sortName={sortOrder}
            onChange={handleSortOrderChange}
            options={["asc", "desc"]}
          />
        </div>

        <div className="grid grid-col-3 gap-3 xs:grid-col-2 xxs:grid-col-1 gap-3 xs:gap-1">
          {filteredProducts.map((product, index) => (
            <>
              <Card {...product} key={product.id} />
              {(index + 1) % 9 === 0 && <AdCard type="card" />}
            </>
          ))}
        </div>
      </main>
    </div>
  );
};
export default PLP;
