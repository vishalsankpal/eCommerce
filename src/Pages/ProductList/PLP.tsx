import { useEffect, useState } from "react";
import {
  getProducts,
  setSelectedCategories,
  setSelectedBrands,
  setSortCriteria,
  resetFilters,
} from "./ProductSlice";
import { useAppSelector, useAppDispatch } from "../../Hooks/hooks";
import { selectFilteredProducts, selectProducts } from "./Selector";
const PLP = () => {
  //const [product, setProduct] = useState([]);
  const { products, isLoading, error } = useAppSelector(
    (state) => state.products
  );
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const allProducts = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleClearFilters = () => {
    dispatch(resetFilters());
    setCategories([]);
    setBrands([]);
  };
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedCategories(categories));
  }, [categories, dispatch]);

  useEffect(() => {
    dispatch(setSelectedBrands(brands));
  }, [brands, dispatch]);

  useEffect(() => {
    dispatch(setSortCriteria({ sortBy, sortOrder }));
  }, [sortBy, sortOrder, dispatch]);

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };
  const handleBrandChange = (brand) => {
    setBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((br) => br !== brand)
        : [...prevBrands, brand]
    );
  };

  const handleSortByChange = (e) => setSortBy(e.target.value);
  const handleSortOrderChange = (e) => setSortOrder(e.target.value);

  const uniqueCategories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];
  const uniqueBrands = [
    ...new Set(allProducts.map((product) => product.brand)),
  ];
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div>
        <h3>Sort By</h3>
        <label>
          Sort By:
          <select value={sortBy} onChange={handleSortByChange}>
            <option value="price">Price</option>
            <option value="title">Title</option>
          </select>
        </label>
        <label>
          Order:
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div>
        <h3>Categories</h3>
        {uniqueCategories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={categories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            {category}
          </label>
        ))}
      </div>
      <div>
        <h3>brands</h3>
        {uniqueBrands.map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              value={brand}
              checked={brands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
      <button onClick={handleClearFilters}>Clear filters</button>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.title} - ${product.price} - {product.category}
          </li>
        ))}
      </ul>
      {/* {Array.isArray(products?.data.products) &&
        products?.data.products.map((item) => (
          <div key={item?.id}>
            <h2>{item?.title}</h2>
            {item?.images.map((imgItem, i) => (
              <div key={i}>
                <img src={imgItem} />
              </div>
            ))}
          </div>
        ))} */}
    </div>
  );
};
export default PLP;
