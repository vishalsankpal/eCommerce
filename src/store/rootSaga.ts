import { all, fork } from "redux-saga/effects";
import getProductsAction from "../Pages/ProductList/Products.Saga";
export default function* rootSaga() {
  yield all([fork(getProductsAction)]);
}
