import { useUserContext } from "../Context/context";
import { URI } from "../utils/url";

const useLoginLoad = () => {
  const { setUser } = useUserContext();

  const loginLoad = async () => {
    const response = await fetch(`${URI}/user/loginWithSessionCokiee`, {
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      return { error: data.error };
    }

    return setUser(data);
  };

  return loginLoad;
};

export default useLoginLoad;