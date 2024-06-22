import { useEffect, useState } from "react";
import styles from "./Sidebar.module.scss";
import {
  setSelectedCategories,
  setSelectedBrands,
  resetFilters,
} from "../../../Pages/ProductList/ProductSlice";
import { selectProducts } from "../../../Pages/ProductList/Selector";
import { useAppSelector, useAppDispatch } from "../../../Hooks/Hooks";
import Filter from "../../Atom/Filter/Filter";

interface Product {
  availabilityStatus: string;
  category: string;
  description: string;
  dimensions: object;
  discountPercentage: number;
  id: number;
  images: [];
  meta: object;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: [];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: [];
  thumbnail: string;
  title: string;
  warrentyInformation: string;
  weight: string;
  brand: string;
  // Add other product properties if needed
}
const Sidebar: React.FC = (): JSX.Element => {
  const allProducts: Product[] = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setSelectedCategories(categories));
  }, [categories, dispatch]);

  useEffect(() => {
    dispatch(setSelectedBrands(brands));
  }, [brands, dispatch]);
  const handleClearFilters = () => {
    dispatch(resetFilters());
    setCategories([]);
    setBrands([]);
  };
  const handleCategoryChange = (category: string) => {
    setCategories((prevCategories: string[]) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };
  const handleBrandChange = (brand: string) => {
    setBrands((prevBrands: string[]) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((br) => br !== brand)
        : [...prevBrands, brand]
    );
  };
  const uniqueCategories = [
    ...new Set(allProducts.map((product: Product) => product.category)),
  ];
  const uniqueBrands = [
    ...new Set(allProducts.map((product: Product) => product.brand)),
  ];
  return (
    <>
      <button
        className={styles.btnToggle}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        show
      </button>
      <aside className={showSidebar ? styles.show : " "}>
        {(categories.length >= 1 || brands.length >= 1) && (
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <div className={styles.filterIcon}></div>
              <h2 className={styles.filterText}>Filter</h2>
            </div>
            <button onClick={handleClearFilters} className={styles.clearFilter}>
              Clear All
            </button>
          </div>
        )}
        <Filter
          FilterName="Category"
          cats={uniqueCategories}
          appliedCat={categories}
          onChange={handleCategoryChange}
        />
        <Filter
          FilterName="Brands"
          cats={uniqueBrands}
          appliedCat={brands}
          onChange={handleBrandChange}
        />
      </aside>
    </>
  );
};
export default Sidebar;
