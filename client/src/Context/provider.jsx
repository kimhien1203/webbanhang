/* eslint-disable react/prop-types */
import { useState } from "react";
import { User } from "./context";
// import { useDispatch } from "react-redux";
// import { cartAction } from "../store/store";

export default function UserProvider({ children }) {
  // const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
}