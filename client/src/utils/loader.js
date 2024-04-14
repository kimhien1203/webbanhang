import { URI } from "../utils/url";

export async function loader() {
  const response = await fetch(`${URI}/product`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Couldn't fetch data");
  }

  return response;
}