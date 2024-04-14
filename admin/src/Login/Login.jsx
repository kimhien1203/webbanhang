import { useState } from "react";
import FormContainer from "../ReusableComponent/FormContainer";
import FormInputs from "../ReusableComponent/FormInputs";
import { useActionData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toastSuccess } from "../util/toast";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const response = useActionData();

  useEffect(() => {
    if (response?.user._id) {
      setAuth(response.user);
      toastSuccess(`Welcome ${response?.user.userName}`);
      navigate("/");
    }
  }, [response?.user, setAuth, navigate]);

  const [formInput, setFormInput] = useState({
    userName: "",
    password: "",
  });

  return (
    <FormContainer title="  Đăng nhập">
      <FormInputs fields={formInput} setFormInput={setFormInput} />
    </FormContainer>
  );
}