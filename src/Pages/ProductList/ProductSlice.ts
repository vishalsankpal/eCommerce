import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a Product
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
  // Add other fields as necessary
}

// Define the ProductState interface
interface ProductState {
  isLoading: boolean;
  products: Product[];
  error: string | null;
  selectedCategories: string[];
  selectedBrands: string[];
  sortBy: string;
  sortOrder: string;
  offset: number;
}

// Initial state with consistent typing
const initialState: ProductState = {
  isLoading: false,
  products: [],
  error: null,
  selectedCategories: [],
  selectedBrands: [],
  sortBy: "price", // Default sort criteria
  sortOrder: "asc", // Default sort order
  offset: 0,
};

// Create the product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state) {
      state.isLoading = true;
      state.error = null;
    },
    getProductsSuccess(state, action: PayloadAction<Product[]>) {
      console.log("getproduct Success:", action);
      state.isLoading = false;
      state.products = action.payload;
      //state.offset = action.payload.length;
      state.error = null;
    },
    getProductsFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.products = [];
      state.error = action.payload;
    },
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    setSelectedBrands(state, action: PayloadAction<string[]>) {
      state.selectedBrands = action.payload;
    },
    setSortCriteria(
      state,
      action: PayloadAction<{ sortBy: string; sortOrder: string }>
    ) {
      const { sortBy, sortOrder } = action.payload;
      state.sortBy = sortBy;
      state.sortOrder = sortOrder;
    },
    resetFilters(state) {
      state.selectedCategories = initialState.selectedCategories;
      state.selectedBrands = initialState.selectedBrands;
    },
    fetchMoreProducts(state) {
      //state.isLoading = true;
      state.error = null;
    },
    fetchMoreProductsSuccess(state, action: PayloadAction<Product[]>) {
      //state.isLoading = false;
      console.log(...state.products);
      state.products = [...state.products, ...action.payload];
      state.offset += action.payload.length;
    },
    fetchMoreProductsFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setPagination(
      state,
      action: PayloadAction<{ currentPage: number; totalPages: number }>
    ) {
      state.pagination.currentPage = action.payload.currentPage;
      state.pagination.totalPages = action.payload.totalPages;
    },
  },
});

// Export actions and reducer
export const {
  getProducts,
  getProductsSuccess,
  getProductsFailed,
  setSelectedCategories,
  setSelectedBrands,
  setSortCriteria,
  resetFilters,
  fetchMoreProducts,
  fetchMoreProductsSuccess,
  fetchMoreProductsFailed,
  setPagination,
} = productSlice.actions;

export default productSlice.reducer;
