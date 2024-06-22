import { createSelector } from "@reduxjs/toolkit";

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

interface ProductsState {
  products: Product[];
  selectedCategories: string[];
  selectedBrands: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface RootState {
  products: ProductsState;
}

export const selectProducts = (state: RootState) =>
  state.products.products || [];
export const selectSelectedCategories = (state: RootState) =>
  state.products.selectedCategories;
export const selectedBrands = (state: RootState) =>
  state.products.selectedBrands;
export const selectSortBy = (state: RootState) => state.products.sortBy;
export const selectSortOrder = (state: RootState) => state.products.sortOrder;

// const sortProducts = (
//   products: Product[],
//   sortBy: string,
//   sortOrder: "asc" | "desc"
// ): Product[] => {
//   return products.slice().sort((a, b) => {
//     if (sortBy === "price") {
//       return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
//     }
//     if (sortBy === "title") {
//       return sortOrder === "asc"
//         ? a.title.localeCompare(b.title)
//         : b.title.localeCompare(a.title);
//     }
//     return 0;
//   });
// };
// export const selectFilteredProducts = createSelector(
//   [
//     selectProducts,
//     selectSelectedCategories,
//     selectedBrands,
//     selectSortBy,
//     selectSortOrder,
//   ],
//   (
//     products: Product[],
//     selectedCategories: string[],
//     selectedBrands: string[],
//     sortBy: "price" | "title",
//     sortOrder: "asc" | "desc"
//   ) => {
//     const filteredProducts = products?.filter(
//       (product: Product) =>
//         (selectedCategories.length === 0 ||
//           selectedCategories.includes(product.category)) &&
//         (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
//     );
//     return sortProducts(filteredProducts, sortBy, sortOrder);
//   }
// );
const selectFilteredProducts = createSelector(
  [
    selectProducts,
    selectSelectedCategories,
    selectedBrands,
    selectSortBy,
    selectSortOrder,
  ],
  (products, selectedCategories, selectedBrands, sortBy, sortOrder) => {
    // Implement your filtering logic here
    // Example: filter products based on selected categories and brands
    const filteredProducts = products.filter((product: Product) => {
      return (
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
      );
    });

    // Implement sorting logic
    // Example: sort products based on sortBy and sortOrder
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === "title") {
        return sortOrder === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

    return sortedProducts;
  }
);
export default selectFilteredProducts;
