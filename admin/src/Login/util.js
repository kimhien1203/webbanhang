import { toastError } from "../util/toast";
import { URI } from "../util/url";

export async function login({ request }) {
  const formInput = Object.fromEntries(await request.formData());

  if (formInput.userName.length === 0) {
    return toastError("Username không đưuọc để trống");
  }

  if (formInput.password.length === 0) {
    return toastError("Password không được để trống");
  }

  try {
    const res = await fetch(`${URI}/user/loginAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInput),
      credentials: "include",
    });

    if (!res.ok) {
      const responese = await res.json();
      throw new Error(responese.message);
    }

    return res;
  } catch (error) {
    return toastError(error.message);
  }
}