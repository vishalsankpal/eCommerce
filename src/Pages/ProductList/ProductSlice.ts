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
} = productSlice.actions;

export default productSlice.reducer;
