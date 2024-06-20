import { createSelector } from "@reduxjs/toolkit";

export const selectProducts = (state) => state.products.products;
export const selectSelectedCategories = (state) =>
  state.products.selectedCategories;
export const selectedBrands = (state) => state.products.selectedBrands;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSelectedCategories, selectedBrands],
  (products, selectedCategories, selectedBrands) =>
    products?.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
);
