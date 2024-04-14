import { URI } from "../../utils/url";

export async function getDetail({ params }) {
  const productID = params.productID;

  const res = await fetch(`${URI}/product/${productID}`);

  return res;
}