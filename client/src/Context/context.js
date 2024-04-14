import { createContext, useContext } from "react";

export const User = createContext();

export function useUserContext() {
  return useContext(User);
}