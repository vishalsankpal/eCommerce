import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.products;
export const selectSelectedCategories = (state) =>
  state.products.selectedCategories;
export const selectedBrands = (state) => state.products.selectedBrands;
export const selectSortBy = (state) => state.products.sortBy;
export const selectSortOrder = (state) => state.products.sortOrder;

const sortProducts = (products, sortBy, sortOrder) => {
  return products.slice().sort((a, b) => {
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
};

export const selectFilteredProducts = createSelector(
  [
    selectProducts,
    selectSelectedCategories,
    selectedBrands,
    selectSortBy,
    selectSortOrder,
  ],
  (products, selectedCategories, selectedBrands, sortBy, sortOrder) => {
    const filteredProducts = products?.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );
    return sortProducts(filteredProducts, sortBy, sortOrder);
  }
);
