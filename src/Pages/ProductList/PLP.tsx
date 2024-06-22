import { ChangeEvent, useEffect, useState } from "react";
import { getProducts, setSortCriteria } from "./ProductSlice";
import { useAppSelector, useAppDispatch } from "../../Hooks/Hooks";
import { selectFilteredProducts } from "./Selector";
import Sorting from "../../Components/Atom/Sorting/Sorting";
//import Filter from "../../Components/Atom/Filter/Filter";
import Loader from "../../Components/Templates/Loader/Loader";
import { plpWrapper } from "./PLP.module.scss";
import Sidebar from "../../Components/Organisms/Sidebar/Sidebar";
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
const PLP: React.FC = (): JSX.Element => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  // const allProducts: Product[] = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  // const [categories, setCategories] = useState<string[]>([]);
  // const [brands, setBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("price");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  // const handleClearFilters = () => {
  //   dispatch(resetFilters());
  //   setCategories([]);
  //   setBrands([]);
  // };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setSelectedCategories(categories));
  // }, [categories, dispatch]);

  // useEffect(() => {
  //   dispatch(setSelectedBrands(brands));
  // }, [brands, dispatch]);

  useEffect(() => {
    dispatch(setSortCriteria({ sortBy, sortOrder }));
    //console.log(filteredProducts);
  }, [sortBy, sortOrder, dispatch]);

  // const handleCategoryChange = (category: string) => {
  //   setCategories((prevCategories: string[]) =>
  //     prevCategories.includes(category)
  //       ? prevCategories.filter((cat) => cat !== category)
  //       : [...prevCategories, category]
  //   );
  // };
  // const handleBrandChange = (brand: string) => {
  //   setBrands((prevBrands: string[]) =>
  //     prevBrands.includes(brand)
  //       ? prevBrands.filter((br) => br !== brand)
  //       : [...prevBrands, brand]
  //   );
  // };

  const handleSortByChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value);
  const handleSortOrderChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value);

  // const uniqueCategories = [
  //   ...new Set(allProducts.map((product: Product) => product.category)),
  // ];
  // const uniqueBrands = [
  //   ...new Set(allProducts.map((product: Product) => product.brand)),
  // ];
  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={`grid ${plpWrapper}`}>
      {/* <button onClick={handleClearFilters}>Clear filters</button>
        <Filter
          FilterName="Categories"
          cats={uniqueCategories}
          appliedCat={categories}
          onChange={handleCategoryChange}
        />
        <Filter
          FilterName="Brands"
          cats={uniqueBrands}
          appliedCat={brands}
          onChange={handleBrandChange}
        /> */}
      <Sidebar />
      <main>
        <Sorting
          labelName={"Sort By"}
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

        <div className="grid grid-col-3 gap-3">
          {filteredProducts.map((product) => (
            <div key={product.id}>
              {product.title} - ${product.price} - {product.category}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
export default PLP;
