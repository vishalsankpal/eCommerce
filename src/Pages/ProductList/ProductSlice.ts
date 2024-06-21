import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  isLoading: boolean;
  products: [] | null;
  error: string | null;
  selectedCategories: [] | null;
  selectedBrands: [] | null;
  sortBy: string;
  sortOrder: string;
}

const initialState: ProductState = {
  isLoading: false,
  products: [],
  error: null,
  selectedCategories: [],
  selectedBrands: [],
  sortBy: "price", // Default sort criteria
  sortOrder: "asc", // Default sort order
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state) {
      state.isLoading = true;
      state.error = null;
    },
    getProductsSuccess: (state, action: PayloadAction<{ results: any[] }>) => {
      console.log("getproduct Success:", action);
      state.isLoading = false;
      //state.data = action.payload.results;
      console.log("success data", action.payload);
      state.products = action.payload;
      //console.log(state.data);
      state.error = null;
    },
    getProductsFailed: (state, action: PayloadAction<{ error: string }>) => {
      state.isLoading = false;
      state.data = [];
      state.error = action.payload;
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    setSelectedBrands(state, action) {
      state.selectedBrands = action.payload;
    },
    /*
      Here we will create remaining filters
      But in this particular situation actual api and data is not available so once get will work on remaining part.
    */
    setSortCriteria(state, action) {
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

// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface ProductState {
//   isLoading: boolean;
//   data: any[] | null;
//   error: string | null;
//   selectedCategories: [] | null;
// }

// const initialState: ProductState = {
//   isLoading: false,
//   data: null,
//   error: null,
//   selectedCategories: [],
// };

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {
//     getProducts: (state) => {
//       state.isLoading = true;
//     },
//     getProductsSuccess: (state, action: PayloadAction<{ results: any[] }>) => {
//       console.log("getproduct Success:", action);
//       state.isLoading = false;
//       state.data = action.payload.results;
//       console.log(state.data);
//       state.error = null;
//     },
//     getProductsFailed: (state, action: PayloadAction<{ error: string }>) => {
//       state.isLoading = false;
//       state.data = [];
//       state.error = action.payload.error;
//     },
//     setSelectedCategories(state, action) {
//       state.selectedCategories = action.payload;
//     },
//   },
// });

// export const {
//   getProducts,
//   getProductsSuccess,
//   getProductsFailed,
//   setSelectedCategories,
// } = productSlice.actions;
// export default productSlice.reducer;
