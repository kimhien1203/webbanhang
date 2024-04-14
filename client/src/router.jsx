import { createBrowserRouter } from "react-router-dom";

import App from "./App";
// pages
import ErrorPage from "./Pages/ErrorPage";
import HomePage from "./Pages/HomePage/HomePage";
import ShopPage from "./Pages/ShopPage/ShopPage";
import DetailPage from "./Pages/DetailPage/DetailPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import HistoryPage from "./Pages/HistoryPage/HistoryPage";
// loader
import { loader as rootLoader } from "./utils/loader";
import { signUp } from "./Pages/LoginPage/action";
import { getDetail } from "./Pages/DetailPage/loader";
import OrderDetail from "./Pages/HistoryPage/OrderDetail";

const router = createBrowserRouter([
  {
    id: "root",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        path: "/",
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "detail/:productID",
        element: <DetailPage />,
        loader: getDetail,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        action: signUp,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "order/:orderId",
        element: <OrderDetail />,
      },
    ],
  },
]);

export default router;