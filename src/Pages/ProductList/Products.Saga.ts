import { put, takeLatest, call } from "redux-saga/effects";
import { getProductsSuccess, getProductsFailed } from "./ProductSlice";
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

function* getProducts() {
  try {
    const response: { products: Product[] } = yield call(
      getRequest,
      "https://dummyjson.com/products?limit=50"
    );
    if (!response || !response.products) {
      yield put(getProductsFailed("Unable to load products"));
      return;
    }
    console.log(response.products);
    yield put(getProductsSuccess(response.products));
  } catch (e) {
    const error = e as Error;
    yield put(getProductsFailed(error.message));
  }
}

function* getProductsAction() {
  yield takeLatest("products/getProducts", getProducts);
}

export default getProductsAction;
