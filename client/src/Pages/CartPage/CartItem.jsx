/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import {
  useGetCartItemQuery,
  useUpdateCartMutation,
} from "../../store/services";

export default function CartItem({ id }) {
  const { data, isFetching, isSuccess } = useGetCartItemQuery(id);
  const [updateCart, { isLoading }] = useUpdateCartMutation();

  const onChangeQuantity = async (intent, quantity) => {
    if ((quantity === 1 && intent === "minus") || isLoading) {
      return;
    }

    let newQuantity = intent === "plus" ? 1 : -1;

    try {
      await updateCart({ _id: id, newQuantity: newQuantity });

      intent === "minus"
        ? toast.success("Minus item", { icon: "➖" })
        : toast.success("Added to cart");
    } catch (error) {
      console.log("error:", error);
    }
  };

  let content;

  if (isSuccess) {
    const { item, quantity } = data;

    content = (
      <>
        <td>
          <div className="px-3 d-flex align-items-center">
            <i
              onClick={() => {
                onChangeQuantity("minus", quantity);
              }}
              className="fa-solid fa-chevron-left"
            ></i>
            <p className={`px-2 ${isFetching || isLoading ? "blur" : null}`}>
              {quantity}
            </p>
            <i
              onClick={() => {
                onChangeQuantity("plus", quantity);
              }}
              className="fa-solid fa-chevron-right"
            ></i>
          </div>
        </td>
        <td>
          <p className={isFetching || isLoading ? "blur" : null}>
            {(quantity * item.price)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            VND
          </p>
        </td>
        <td>
          <i
            onClick={() => {
              toast.info("Remove from cart", { icon: "🗑" });
            }}
            className="fa-solid fa-trash-can"
          ></i>
        </td>
      </>
    );
  }

  return <>{content}</>;
}