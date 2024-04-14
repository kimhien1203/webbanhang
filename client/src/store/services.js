import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URI } from "../utils/url";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${URI}`,
  }),
  tagTypes: ["Item", "Order"],
  endpoints: (builder) => ({
    // GET cart
    getCart: builder.query({
      query: () => ({
        url: "/user/cart",
        credentials: "include",
      }),
      // eslint-disable-next-line no-unused-vars
      providesTags: (result = [], error, arg) => {
        return [
          "Item",
          ...result.items.map(({ _id }) => ({ type: "Item", id: _id })),
        ];
      },
    }),
    // GET single item
    getCartItem: builder.query({
      query: (id) => ({
        url: `user/cart/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, arg) => {
        console.log(result);
        return [{ type: "Item", id: arg }];
      },
    }),
    // PATCH update cart's item
    updateCart: builder.mutation({
      query: (body) => ({
        url: "user/cart",
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Item", id: arg.id }],
    }),
    getOrders: builder.query({
      query: () => ({
        url: "order/",
        credentials: "include",
      }),
      // eslint-disable-next-line no-unused-vars
      providesTags: (result = [], error, arg) => {
        return [
          "Order",
          ...result.map(({ id }) => ({ type: "Order", id: id })),
        ];
      },
    }),
    postOrder: builder.mutation({
      query: (body) => ({
        url: "order/post",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Order", "Item"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `order/${id}`,
        credentials: "include",
      }),
      providesTags: (result, error, arg) => {
        return [{ type: "Order", id: arg }];
      },
    }),
  }),
});

export const {
  useGetCartQuery,
  useGetCartItemQuery,
  useUpdateCartMutation,
  useGetOrdersQuery,
  usePostOrderMutation,
  useGetSingleOrderQuery,
} = api;