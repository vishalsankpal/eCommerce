import { useEffect, useState } from "react";
import {
  getProducts,
  setSelectedCategories,
  setSelectedBrands,
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
  useEffect(() => {
    dispatch(getProducts());
    // fetch("https://api.escuelajs.co/api/v1/products")
    //   .then((res) => res.json())
    //   .then((data) =>
    //     //   data.products.map(
    //     //     (item) =>
    //     //       item.brand === "Rolex" && setProduct((prev) => [...prev, item])
    //     //   )
    //     setProduct(data)
    //   );
    console.log("actual data", products?.data?.products);
  }, [dispatch]);
  useEffect(() => {
    dispatch(setSelectedCategories(categories));
  }, [categories, dispatch]);
  useEffect(() => {
    dispatch(setSelectedBrands(brands));
  }, [brands, dispatch]);
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
