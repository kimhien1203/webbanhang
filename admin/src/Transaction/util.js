import { URI } from "../util/url";

export async function getTrans() {
  try {
    const res = await fetch(`${URI}/transactions`);

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return res;
  } catch (error) {
    console.log("error:", error);
  }
}

export async function getSpeicifcTrans({ params }) {
  const id = params.transID;
  const res = fetch(`${URI}/transactions/${id}`);

  return res;
}