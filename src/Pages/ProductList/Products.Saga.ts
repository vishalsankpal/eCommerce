import { put, takeLatest, call, takeEvery } from "redux-saga/effects";
import {
  getProductsSuccess,
  getProductsFailed,
  fetchMoreProductsFailed,
  fetchMoreProductsSuccess,
} from "./ProductSlice";
import { getRequest } from "../../services/http.service";

interface Product {
  // Define the structure of your product here
  // Example:
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  brand: string;
}

let LIMIT = 10;
function* getProducts() {
  try {
    const response: { products: Product[] } = yield call(
      getRequest,
      `https://dummyjson.com/products?&limit=${LIMIT}`
    );
    if (!response || !response.products) {
      yield put(getProductsFailed("Unable to load products"));
      return;
    }
    yield put(getProductsSuccess(response.products));
  } catch (e) {
    const error = e as Error;
    yield put(getProductsFailed(error.message));
  }
}
function* fetchMoreProducts(action: { payload: number }) {
  try {
    const offset = action.payload;
    console.log(action.payload);
    const response = yield call(
      getRequest,
      `https://dummyjson.com/products?&skip=${action.payload}&limit=${action.payload}`
    );
    console.log(response);
    yield put(fetchMoreProductsSuccess(response.products));
  } catch (error) {
    yield put(fetchMoreProductsFailed(error.message));
  }
}
function* getProductsAction() {
  yield takeLatest("products/getProducts", getProducts);
}
function* fetchMoreProductsSaga() {
  yield takeEvery("products/fetchMoreProducts", fetchMoreProducts);
}
export { getProductsAction, fetchMoreProductsSaga };
