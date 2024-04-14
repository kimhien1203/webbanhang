import { createBrowserRouter } from "react-router-dom";
import App from "./App";

// HOTEL related routes
import Product from "./Product/Components/Product";
import AddProduct from "./Product/Components/AddProduct";
import EditProduct from "./Product/Components/EditProduct";
import {
  getSinglePrd,
  getProducts,
  addPrd,
  updateProduct,
  // delHotel,
} from "./Product/util";

import { login } from "./Login/util";

// Dashboard
import Dashboard from "./Dashboard/Dashboard";

// Transaction
import Transaction from "./Transaction/Transaction";
import { getTrans } from "./Transaction/util";
import Message from "./Message/Message";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: login,
    children: [
      //index
      {
        index: true,
        element: <Dashboard />,
        // loader: getTrans,
      },

      // hotel paths
      {
        path: "product",
        children: [
          {
            path: "",
            element: <Product />,
            loader: getProducts,
          },
          // {
          //   path: ":hotelId/delete",
          //   action: delHotel,
          // },
          {
            path: ":prdId",
            element: <EditProduct />,
            loader: getSinglePrd,
            action: updateProduct,
          },
          {
            path: "add",
            element: <AddProduct />,
            action: addPrd,
          },
        ],
      },

      {
        path: "message",
        element: <Message />,
      },

      // Transactions related paths
      // {
      //   path: "transactions",
      //   children: [
      //     {
      //       path: "",
      //       element: <Transaction />,
      //       loader: getTrans,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;